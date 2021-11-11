# Public IP Display

## For users

Official downloads:

- [Firefox add-on](https://addons.mozilla.org/en-US/firefox/addon/public-ip-display/)
- [Chrome extension](https://chrome.google.com/webstore/detail/lpbdnabmlikokalkbdoadccamhcfmnga)

## Acknowledgements

Country flags courtesy of [emcrisostomo/flags](https://github.com/emcrisostomo/flags)

## For developers & reviewers

### Setup

1. check `.node-version` and install [nodejs](https://nodejs.org/)  
   (with [nvs](https://github.com/jasongin/nvs): execute `nvs use`)
2. install [yarn](https://yarnpkg.com/)
3. execute `yarn install`

### Testing

1. install [Firefox Developer Edition](https://www.mozilla.org/firefox/developer/) or [your Chrome of choice](https://dev.chromium.org/getting-involved/dev-channel)
2. execute `yarn compile`
3. execute any of the following:
   - `yarn package` to build the webext zip into `./dist`
   - `yarn start` to run the addon in Firefox
   - `yarn start:chrome` to run the addon in Chrome
