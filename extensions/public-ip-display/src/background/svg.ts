import browser, { Action } from "webextension-polyfill";

// pixels
const flagSize = 38;

export async function renderSvg(
    canvasName: string,
    imgName: string,
    fileName: string
): Promise<Record<"38", Action.ImageDataType>> {
    const canvas = document.getElementById(canvasName) as HTMLCanvasElement;
    canvas.width = flagSize;
    canvas.height = flagSize;
    const context = canvas.getContext("2d")!;
    const img = document.getElementById(imgName) as HTMLImageElement;

    await new Promise<void>((resolve) => {
        const onLoad = (): void => {
            img.removeEventListener("load", onLoad);
            resolve();
        };
        img.addEventListener("load", onLoad);
        img.src = browser.runtime.getURL(fileName);
    });

    const longestSide = Math.max(img.naturalWidth, img.naturalHeight);
    // assuming square canvas
    const scaleDownFactor = canvas.width / longestSide;

    const width = Math.floor(img.naturalWidth * scaleDownFactor);
    const height = Math.floor(img.naturalHeight * scaleDownFactor);

    const centeredWidthOffset = (canvas.width - width) / 2;
    const centeredHeightOffset = (canvas.height - height) / 2;
    context.drawImage(
        img,
        centeredWidthOffset,
        centeredHeightOffset,
        width,
        height
    );

    const imageData = {
        "38": context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        ) as Action.ImageDataType,
    };

    img.src = "";
    context.clearRect(0, 0, canvas.width, canvas.height);

    return imageData;
}
