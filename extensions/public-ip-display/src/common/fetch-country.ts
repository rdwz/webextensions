import { asCountryCode } from "./checks";
import type { CountryData } from "./ipdata";
import { CountryService } from "./settings/enums";
import { UnreachableCaseError } from "ts-essentials";
import type { JsonObject } from "type-fest";

type GetCountry = () => Promise<CountryData>;

function fetcher(
    id: CountryService,
    url: URL,
    extract: (response: string) => string
): GetCountry {
    return async () => {
        const response = await fetch(url.href);

        if (response.status === 200) {
            try {
                const text = await response.text();
                const country = asCountryCode(extract(text)).toUpperCase();

                return { country, countryService: id };
            } catch (errror) {
                throw new Error(`${id}'s response was not understood.`);
            }
        } else {
            throw new Error(`${id} responded with HTTP ${response.status}.`);
        }
    };
}

export function countryGetter(service: CountryService): [GetCountry, number] {
    switch (service) {
        case CountryService.ifConfig:
            return [
                fetcher(
                    CountryService.ifConfig,
                    new URL("https://ifconfig.co/country-iso"),
                    (body) => body.trim()
                ),
                1,
            ];

        case CountryService.freeGeo: {
            const extractFromJson = (body: string): string => {
                const json = JSON.parse(body) as JsonObject;
                return json.country_code as string;
            };
            return [
                fetcher(
                    CountryService.freeGeo,
                    new URL("https://freegeoip.app/json/"),
                    extractFromJson
                ),
                1,
            ];
        }

        case CountryService.ipApi: {
            const extractFromJson = (body: string): string => {
                const json = JSON.parse(body) as JsonObject;
                return json.country as string;
            };
            return [
                fetcher(
                    CountryService.ipApi,
                    new URL("https://ipapi.co/json/"),
                    extractFromJson
                ),
                2,
            ];
        }

        default:
            throw new UnreachableCaseError(service);
    }
}
