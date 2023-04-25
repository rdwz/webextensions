import { CountryService, IpService, SyncIO } from "../common/";

const html = {
    countryCodeService: document.getElementById(
        "countryCodeService"
    ) as HTMLSelectElement,
    displayFlag: document.getElementById("displayFlag") as HTMLInputElement,
    ipEchoService: document.getElementById(
        "ipEchoService"
    ) as HTMLSelectElement,
    lookUpCountry: document.getElementById("lookUpCountry") as HTMLInputElement,
    notify: document.getElementById("notify") as HTMLInputElement,
    refreshRate: document.getElementById("refreshRate") as HTMLInputElement,
};

export function rigNotify(settings: SyncIO.SyncSettings): void {
    html.notify.checked = settings.notify;

    html.notify.addEventListener("change", () => {
        SyncIO.write({
            notify: html.notify.checked,
        }).catch(console.error);
    });
}

export function rigRefreshRate(settings: SyncIO.SyncSettings): void {
    html.refreshRate.value = String(settings.refreshRate);

    html.refreshRate.addEventListener("change", () => {
        SyncIO.write({
            refreshRate: parseInt(html.refreshRate.value, 10),
        }).catch(console.error);
    });
}

export function rigIpService(settings: SyncIO.SyncSettings): void {
    html.ipEchoService.selectedIndex = [
        ...html.ipEchoService.options,
    ].findIndex((option) => option.value === String(settings.ipEchoService));

    html.ipEchoService.addEventListener("change", () => {
        SyncIO.write({
            ipEchoService: html.ipEchoService.value as IpService,
        }).catch(console.error);
    });
}

export function rigLookUpCountry(settings: SyncIO.SyncSettings): void {
    html.lookUpCountry.checked = settings.lookUpCountry;
    html.displayFlag.disabled = !settings.lookUpCountry;
    html.countryCodeService.disabled = !settings.lookUpCountry;

    html.lookUpCountry.addEventListener("change", () => {
        html.displayFlag.disabled = !html.lookUpCountry.checked;
        html.countryCodeService.disabled = !html.lookUpCountry.checked;

        SyncIO.write({
            lookUpCountry: html.lookUpCountry.checked,
        }).catch(console.error);
    });
}

export function rigDisplayFlag(settings: SyncIO.SyncSettings): void {
    html.displayFlag.checked = settings.displayFlag;

    html.displayFlag.addEventListener("change", () => {
        SyncIO.write({
            displayFlag: html.displayFlag.checked,
        }).catch(console.error);
    });
}

export function rigCountryCodeService(settings: SyncIO.SyncSettings): void {
    html.countryCodeService.selectedIndex = [
        ...html.countryCodeService.options,
    ].findIndex(
        (option) => option.value === String(settings.countryCodeService)
    );

    html.countryCodeService.addEventListener("change", () => {
        SyncIO.write({
            countryCodeService: html.countryCodeService.value as CountryService,
        }).catch(console.error);
    });
}
