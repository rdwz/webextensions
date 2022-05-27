# Marnes' WebExtensions

## For users

This repository hosts all extensions developed by Marnes (see
[list](./extensions)) in one place. Please report bugs, ask questions, or
request features for any of them here.

Contributions in the form of developer efforts or
[buying me some coffees](https://www.buymeacoffee.com/marnes) are most
appreciated. Feedback — positive words or critical but fair review — is
preferably left on the Firefox/Chrome stores.

My extensions were originally created to suit my own needs, then taken public
for programming practice and to be useful to more people than only me. They are
(and will remain) spare time projects.

### Official downloads

- [Firefox add-ons](https://addons.mozilla.org/en-US/firefox/user/4545060/)
- [Chrome extensions](https://chrome.google.com/webstore/search/Marnes?_category=extensions)

## For developers & reviewers

### Setup

1. check `.node-version` and install [nodejs](https://nodejs.org/)  
   (with [nvs](https://github.com/jasongin/nvs): execute `nvs use`)
2. install [yarn](https://yarnpkg.com/)
3. execute `yarn install`

### Testing

1. install
   [Firefox Developer Edition](https://www.mozilla.org/firefox/developer/) or
   [your Chrome of choice](https://dev.chromium.org/getting-involved/dev-channel)
2. `cd` to the relevant extension in [`./extensions`](./extensions)
3. execute `yarn parcel:build`
4. execute any of the following:

- `yarn webext:build` to build the webext zip into `./dist/webext`
- `yarn start` to run the addon in Firefox
- `yarn start:chrome` to run the addon in Chrome
