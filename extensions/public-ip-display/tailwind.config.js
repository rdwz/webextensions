/** @type {import("tailwindcss").Config} */
module.exports = {
    content: ["./src/popup.html", "./src/popup/**/*.tsx"],
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {},
    },
    plugins: [],
};
