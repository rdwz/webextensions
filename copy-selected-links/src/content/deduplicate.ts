export function deduplicateBy<T>(list: T[], keyMapper: (element: T) => string): T[] {
    const keys: string[] = [];
    const output: T[] = [];

    for (const element of list) {
        const key = keyMapper(element);
        if (!keys.includes(key)) {
            keys.push(key);
            output.push(element);
        }
    }

    return output;
}
