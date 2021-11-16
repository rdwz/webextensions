# Marnes' WebExtensions

## For users

Official downloads:

- [Firefox add-ons](https://addons.mozilla.org/en-US/firefox/user/4545060/)
- [Chrome extensions](https://chrome.google.com/webstore/search/Marnes?_category=extensions)

## For developers & reviewers

### Setup

1. check `.node-version` and install [nodejs](https://nodejs.org/)  
   (with [nvs](https://github.com/jasongin/nvs): execute `nvs use`)
2. install [yarn](https://yarnpkg.com/)
3. execute `yarn install`

### Testing

1. install [Firefox Developer Edition](https://www.mozilla.org/firefox/developer/) or [your Chrome of choice](https://dev.chromium.org/getting-involved/dev-channel)
2. `cd` to the relevant extension in [`./extensions`](./extensions)
3. execute `yarn compile`
4. execute any of the following:

- `yarn package` to build the webext zip into `./dist`
- `yarn start` to run the addon in Firefox
- `yarn start:chrome` to run the addon in Chrome
