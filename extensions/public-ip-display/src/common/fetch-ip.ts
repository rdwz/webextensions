import { asIp } from "./checks";
import type { IpData } from "./ipdata";
import { IpService } from "./settings/enums";
import { UnreachableCaseError } from "ts-essentials";
import type { JsonObject } from "type-fest";

type GetIp = () => Promise<IpData>;

function fetcher(
    id: IpService,
    url: URL,
    extract: (response: string) => string
): GetIp {
    return async () => {
        const response = await fetch(url.href);

        if (response.status === 200) {
            try {
                const text = await response.text();
                const ip = asIp(extract(text));

                return { fetchedAt: new Date(), ip, ipService: id };
            } catch (ex) {
                throw new Error(`${id}'s response was not understood.`);
            }
        } else {
            throw new Error(`${id} responded with HTTP ${response.status}.`);
        }
    };
}

const trim = (body: string): string => body.trim();

export function ipGetter(service: IpService): [GetIp, number] {
    switch (service) {
        case IpService.curl:
            return [
                fetcher(IpService.curl, new URL("https://curlmyip.net/"), trim),
                1,
            ];

        case IpService.iCanHaz:
            return [
                fetcher(
                    IpService.iCanHaz,
                    new URL("https://icanhazip.com/"),
                    trim
                ),
                1,
            ];

        case IpService.json: {
            const instance = fetcher(
                IpService.json,
                new URL("https://jsonip.com/"),
                (body) => {
                    const json = JSON.parse(body) as JsonObject;
                    return json.ip as string;
                }
            );
            return [instance, 1];
        }

        case IpService.myExt:
            return [
                fetcher(
                    IpService.myExt,
                    new URL("https://myexternalip.com/raw"),
                    trim
                ),
                1,
            ];

        case IpService.whatIs:
            return [
                fetcher(
                    IpService.whatIs,
                    new URL("https://bot.whatismyipaddress.com/"),
                    trim
                ),
                5,
            ];

        case IpService.ifConfig:
            return [
                fetcher(
                    IpService.ifConfig,
                    new URL("https://ifconfig.co/ip"),
                    trim
                ),
                1,
            ];

        default:
            throw new UnreachableCaseError(service);
    }
}
