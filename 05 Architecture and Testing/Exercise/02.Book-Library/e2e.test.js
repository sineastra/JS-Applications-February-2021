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

// reducing only the values of a json into single flat array
const jsonValuesToArray = (json) =>
	Object.values(JSON.parse(json)).reduce((a, v) => {
		Object.values(v).forEach(x => a.push(x))
		return a
	}, [])

// sorting alphabetically, with option for ascending or descending
const alphaSort = (arr, type) => type === 'asc' || type === 'ascending'
	? arr.sort((a, b) => a.localeCompare(b))
	: arr.sort((a, b) => b.localeCompare(a))

let browser, page

describe('tests preparation', function () {
	this.timeout(6000)
	before(async () => {
		browser = await chromium.launch()
		// browser = await chromium.launch({ headless: false, slowMo: 1000 })
	})
	after(async () => { await browser.close() })
	beforeEach(async () => {
		page = await browser.newPage()
		await page.goto('http://localhost:3000')
	})
	afterEach(async () => { await page.close() })


	// TESTS
	describe('e2e tests', () => {
		it('load books properly', async () => {
			await page.route('**/jsonstore/collections/books*', request => {
				request.fulfill(json(mockData))
			})

			await page.click('#loadBooks')
			await page.waitForSelector('body > table > tbody')

			// geting the text content of books, after pressing load books button
			const pageData = await page.$$eval(
				'tbody > tr > td',
				e => e.map(x => x.innerText)
					.filter(x => x.toLocaleLowerCase() !== 'edit' && x.toLocaleLowerCase() !==
						'edit delete')
			)

			// checking content of page after pressing button is equal to the 'mock-data'
			// both entries deserialized to single flat array and joined to strings, then compared.
			expect(alphaSort(pageData, 'asc').join('')).to
				.eq(alphaSort(jsonValuesToArray(JSON.stringify(mockData)), 'asc').join(''))
		})
		it(`adds book properly `, async () => {
			await page.route('**/jsonstore/collections/books*', request => {
				request.fulfill(json({ title: 'title', author: 'author' }))
			})

			await page.fill('#createForm > [name="title"]', 'title')
			await page.fill('#createForm > [name="author"]', 'author')

			const [response] = await Promise.all([
				page.waitForRequest(r => r.url()
					.includes('/jsonstore/collections/books') && r.method() === 'POST'),
				page.click('text="Submit"')
			])

			expect(JSON.parse(response.postData())).to.deep.eq({ title: 'title', author: 'author' })
		})
	})
	it(`testing delete functionality`, async () => {

		// not working, on dialog confirm it doesnt send request.
		// not gonna dig further wasted 2 hours + for this test.
		await page.route('**/jsonstore/collections/books*', request => {
			request.fulfill(json(mockData))
		})
		await page.route(
			'**/jsonstore/collections/books/*',
			request => request.fulfill(json({ message: 'book deleted' }))
		)
		await page.click('#loadBooks')

		await page.once('dialog', async dialog => {
			await dialog.accept()
		})

		//
		const [response] = await Promise.all([
			page.waitForResponse(r => r.request().url().includes('/jsonstore/collections/books/') &&
				r.request().method() === 'DELETE'),
			page.click('.deleteBtn:nth-child(2)')
		])

		const data = JSON.parse(await response.body())
		expect(data).to.deep.eq({ message: 'book deleted' })
	})
	describe(`edit tests`, () => {
		it(`loads correct form`, async () => {
			await page.route('**/jsonstore/collections/books*', request =>
				request.fulfill(json(mockData)))
			await page.click('#loadBooks')
			await page.click('.editBtn:nth-child(1)')


			const editFormDisplay = await page.$eval('#editForm', el => el.style.display)
			const createFormDisplay = await page.$eval(
				'#createForm',
				el => el.style.display
			)

			expect(editFormDisplay).to.eq('block')
			expect(createFormDisplay).to.eq('none')
		})
		it(`loads correct information`, async () => {
			await page.route('**/jsonstore/collections/books*', request => {
				request.fulfill(json(mockData))
			})
			await page.route('**/jsonstore/collections/books/*', request => {
				request.fulfill(json({ title: 'title', author: 'author' }))
			})
			await page.click('#loadBooks')
			await page.click('.editBtn:nth-child(1)')

			const [response] = await Promise.all([
				page.waitForResponse(r => r.request().url()
					.includes('/jsonstore/collections/books/')),
				page.click('text="Save"')
			])
			const data = JSON.parse(await response.body())

			expect(data.title).to.eq('title')
			expect(data.author).to.eq('author')
		})
		it(`sends correct request`, async () => {
			await page.route('**/jsonstore/collections/books*', request => {
				request.fulfill(json(mockData))
			})
			await page.route(
				'**/jsonstore/collections/books/*',
				request => request.fulfill(json({
					'title': 'title',
					'author': 'author'
				}))
			)

			await page.click('#loadBooks')
			await page.click('.editBtn:nth-child(1)')


			const [response] = await Promise.all([
				page.waitForResponse(r => r.request().url()
					.includes('/jsonstore/collections/books/') && r.request().method() === 'PUT'),
				page.click('text="Save"')
			])
			const data = JSON.parse(await response.body())
			expect(data).to.deep
				.eq({
					title: 'title',
					author: 'author'
				})
		})
	})
})