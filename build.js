const fs = require('fs');
const i18n = require('i18next');
const Backend = require('i18next-fs-backend');
const pug = require('pug');

const compiledView = pug.compileFile('public/views/page.pug');

const supportedLngs = ['en', 'fr'];
const defaultLng = 'fr';

i18n.use(Backend).init({
    lng: defaultLng,
    fallbackLng: defaultLng,
    supportedLngs,
    backend: {
        loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
        addPath: __dirname + '/locales/{{lng}}/{{ns}}.missing.json'
    },
}).then(onInit);

function onInit(translate) {
    async function write(fileName, lang) {
        await i18n.changeLanguage(lang);
        fs.writeFileSync(
            `build/${fileName}.html`,
            compiledView({t: translate}),
        );
    }

    fs.mkdirSync('build');

    supportedLngs.forEach(lang => {
        if (lang === defaultLng) {
            write('index', lang);
        }
        write(lang, lang);
    })
}
