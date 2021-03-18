const { chromium } = require('playwright-chromium')
const { expect } = require('chai')

const mockData = require('./mockData.json')

function json (data) {
	return {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}
}

let browser, page // Declare reusable variables
describe('tests preparation', function () {
	this.timeout(60000)
	before(async () => {
		// browser = await chromium.launch()
		browser = await chromium.launch({ headless: false, slowMo: 1000 })
	})
	after(async () => { await browser.close() })
	beforeEach(async () => {
		page = await browser.newPage()
		await page.goto('http://localhost:3000')
	})
	afterEach(async () => { await page.close() })

	describe('e2e tests', async () => {

		it(`load posts on pressing refresh button`, async () => {
			await page.click('#refresh')

			await page.waitForSelector('#messages')

			const actualMessages = await page.$eval('#messages', e => e.value.trim())
			const expectedMessages = Object.values(mockData.messages)
				.map(x => `${x.author}: ${x.content}`).join('\n')

			expect(actualMessages).to.eq(expectedMessages)
		})

		it(`testing proper form submit`, async () => {
			await page.waitForSelector('#controls')
			await page.route(
				'**/jsonstore/messenger*',
				request => request.fulfill(json({ author: 'Pesho', content: 'Pesho is Peshak' }))
			)


			await page.fill('#author', 'Pesho')
			await page.fill('#content', 'Pesho is Peshak')

			const [response] = await Promise.all([
				page.waitForRequest(r => r.url()
					.includes('/jsonstore/messenger') &&
					r.method() == 'POST'),
				page.click('#submit')
			])
			const responseData = JSON.parse(await response.postData())

			expect(responseData).to.deep.eq({ 'author': 'Pesho', 'content': 'Pesho is Peshak' })
		})
	})
})