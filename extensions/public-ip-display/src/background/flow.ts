import {
    IpCountryData,
    Local,
    Sync,
    SyncIO,
    asError,
    countryGetter,
    ipGetter,
    loadLast,
    loadLog,
    record,
    saveAsLast,
} from "../common";
import { refreshOrdered } from "./messaging";
import { showError, showNotification } from "./notification";
import { essentialConfigChanged } from "./settings-validation";
import { setTimer, timerPassed } from "./timing";
import { setToolbarIcon, setToolbarTooltip } from "./toolbar";
import browser from "webextension-polyfill";

async function callServices(
    options: SyncIO.SyncSettings
): Promise<IpCountryData> {
    const [getIp, ipCooldown] = ipGetter(options.ipEchoService);
    const [getCountry, countryCooldown] = options.lookUpCountry
        ? countryGetter(options.countryCodeService)
        : [null, 0];

    try {
        const ipData = await getIp();
        const countryData = getCountry == null ? null : await getCountry();

        return {
            ...ipData,
            country: countryData?.country ?? null,
            countryService: countryData?.countryService ?? null,
        };
    } finally {
        const longestCooldown = Math.max(ipCooldown, countryCooldown);
        setTimer(Math.max(options.refreshRate, longestCooldown));
    }
}

async function overwriteLast(
    current: IpCountryData
): Promise<IpCountryData | null> {
    const previous = await loadLast();
    await saveAsLast(current);
    return previous;
}

async function appendLog(
    current: IpCountryData,
    previous: IpCountryData | null
): Promise<void> {
    const settings = await Local.load();
    if (settings.logLifetime > 0) {
        const ipLog = await loadLog();

        if (
            ipLog.length === 0 ||
            previous == null ||
            current.ip !== previous.ip ||
            current.country !== previous.country
        ) {
            await record(ipLog, current);
        }
    }
}

async function notify(
    current: IpCountryData,
    previous: IpCountryData | null
): Promise<void> {
    const messageLines = [];

    if (current.ip !== previous?.ip) {
        messageLines.push(`IP: ${current.ip}`);
        messageLines.push(`(${current.ipService})`);
    }

    if (
        current.country != null &&
        current.country !== previous?.country &&
        current.countryService != null
    ) {
        messageLines.push(`Country: ${current.country}`);
        messageLines.push(`(${current.countryService})`);
    }

    if (messageLines.length > 0) {
        await showNotification("Data has changed!", messageLines.join("\n"));
    }
}

async function run(): Promise<void> {
    const options = await Sync.load();

    try {
        const current = await callServices(options);
        const previous = await overwriteLast(current);

        await appendLog(current, previous);

        if (options.notify) {
            await notify(current, previous);
        }

        await setToolbarTooltip(
            current.country == null
                ? current.ip
                : `${current.country} — ${current.ip}`
        );
        await setToolbarIcon(options.displayFlag ? current.country : null);
    } catch (error) {
        console.error("failed to refresh IP", error);
        await showError("Error!", asError(error).message);
    }
}

export function refreshDataOnTriggers(): void {
    const doRun = (): void => {
        run().catch(console.error);
    };
    const description = "refresh IP and country data";

    browser.runtime.onInstalled.addListener(doRun);
    browser.runtime.onStartup.addListener(doRun);
    refreshOrdered.subscribe(doRun, description);
    essentialConfigChanged.subscribe(doRun, description);
    timerPassed.subscribe(doRun, description);
}
