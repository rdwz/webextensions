import { IpService, CountryService } from "../common/settings/enums";
import { SyncSettings, write } from "../common/settings/sync-io";

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

export function rigNotify(settings: SyncSettings): void {
    html.notify.checked = settings.notify;

    html.notify.addEventListener("change", () => {
        write({
            notify: html.notify.checked,
        }).catch(console.error);
    });
}

export function rigRefreshRate(settings: SyncSettings): void {
    html.refreshRate.value = String(settings.refreshRate);

    html.refreshRate.addEventListener("change", () => {
        write({
            refreshRate: parseInt(html.refreshRate.value, 10),
        }).catch(console.error);
    });
}

export function rigIpService(settings: SyncSettings): void {
    html.ipEchoService.selectedIndex = Array.from(
        html.ipEchoService.options
    ).findIndex((option) => option.value === settings.ipEchoService);

    html.ipEchoService.addEventListener("change", () => {
        write({
            ipEchoService: html.ipEchoService.value as IpService,
        }).catch(console.error);
    });
}

export function rigLookUpCountry(settings: SyncSettings): void {
    html.lookUpCountry.checked = settings.lookUpCountry;
    html.displayFlag.disabled = !settings.lookUpCountry;
    html.countryCodeService.disabled = !settings.lookUpCountry;

    html.lookUpCountry.addEventListener("change", () => {
        html.displayFlag.disabled = !html.lookUpCountry.checked;
        html.countryCodeService.disabled = !html.lookUpCountry.checked;

        write({
            lookUpCountry: html.lookUpCountry.checked,
        }).catch(console.error);
    });
}

export function rigDisplayFlag(settings: SyncSettings): void {
    html.displayFlag.checked = settings.displayFlag;

    html.displayFlag.addEventListener("change", () => {
        write({
            displayFlag: html.displayFlag.checked,
        }).catch(console.error);
    });
}

export function rigCountryCodeService(settings: SyncSettings): void {
    html.countryCodeService.selectedIndex = Array.from(
        html.countryCodeService.options
    ).findIndex((option) => option.value === settings.countryCodeService);

    html.countryCodeService.addEventListener("change", () => {
        write({
            countryCodeService: html.countryCodeService.value as CountryService,
        }).catch(console.error);
    });
}
