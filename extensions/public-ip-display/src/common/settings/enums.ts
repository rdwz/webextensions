export enum IpService {
    curl = "curlmyip.net",
    iCanHaz = "icanhazip.com",
    ifConfig = "ifconfig.co",
    json = "jsonip.com",
    myExt = "myexternalip.com",
    whatIs = "whatismyipaddress.com",
}

export function isIpService(id: string): id is IpService {
    const values = Object.values(IpService) as string[];
    return values.includes(id);
}

export enum CountryService {
    freeGeo = "freegeoip.app",
    ifConfig = "ifconfig.co",
    ipApi = "ipapi.co",
}

export function isCountryService(id: string): id is CountryService {
    const values = Object.values(CountryService) as string[];
    return values.includes(id);
}
