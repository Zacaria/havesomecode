const path = require('path');
const puppeteer = require('puppeteer');
const fs = require('fs');

const PAGE = 'http://localhost:8080/';
const FILE_BASE = 'CV_ZACARIA_CHTATAR';

const langs = [ 'en', 'fr' ];

(async () => {
	console.log('Starting browser');
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	// for-of instead of map to have sequencial loop
	for (lang of langs) {
		await goAndPrint(page, lang)
	}

	console.log('Closing');
	await browser.close();
})();

async function goAndPrint(page, lang) {
	const url = PAGE + lang;

	console.log('Open page', url)

	await page.goto(url, { waitUntil: 'networkidle2', preferCSSPageSize: true });

	await fs.mkdirSync('build/cv', {recursive: true});

	await page.pdf({
		path: joinFilePath(lang),
		format: 'A4',
		printBackground: true
	});
}

function joinFilePath(lang) {
	return path.join('build/cv/',`${FILE_BASE}_${lang}.pdf`);
}
