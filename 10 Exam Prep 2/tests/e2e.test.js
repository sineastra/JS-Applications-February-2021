
const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)
const interval = 300;
const DEBUG = false;
const slowMo = 500;

const mockData = require('./mock-data.json');
const endpoints = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout',
    catalog: '/data/cars?sortBy=_createdOn%20desc',
    create: '/data/cars',
    details: (id) => `/data/cars/${id}`,
    delete: (id) => `/data/cars/${id}`,
    profile: (id) => `/data/cars?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`,
    search: (query) => `/data/cars?where=year%3D${query}`
};


let browser;
let context;
let page;

describe('E2E tests', function () {
    // Setup
    this.timeout(DEBUG ? 120000 : 6000);
    before(async () => browser = await chromium.launch(DEBUG ? { headless: false, slowMo } : {}));
    after(async () => await browser.close());
    beforeEach(async () => {
        context = await browser.newContext();
        setupContext(context);
        page = await context.newPage();
    });
    afterEach(async () => {
        await page.close();
        await context.close();
    });


    // Test proper
    describe('Authentication [ 20 Points ]', () => {
        it('register does not work with empty fields [ 5 Points ]', async () => {
            const { post } = await handle(endpoints.register);
            const isCalled = post().isHandled;

            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=Register');

            await page.waitForTimeout(interval);
            await page.waitForSelector('form');

            await page.click('[type="submit"]');

            await page.waitForTimeout(interval);

            expect(isCalled()).to.be.false;
        });

        it('register makes correct API call [ 5 Points ]', async () => {
            const data = mockData.users[0];
            const { post } = await handle(endpoints.register);
            const { onRequest } = post(data);

            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=Register');

            await page.waitForTimeout(interval);
            await page.waitForSelector('form');

            await page.fill('[name="username"]', data.username);
            await page.fill('[name="password"]', data.password);
            await page.fill('[name="repeatPass"]', data.password);

            const [request] = await Promise.all([
                onRequest(),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(request.postData());

            expect(postData.username).to.equal(data.username);
            expect(postData.password).to.equal(data.password);
        });

        it('login makes correct API call [ 5 Points ]', async () => {
            const data = mockData.users[0];
            const { post } = await handle(endpoints.login);
            const { onRequest } = post(data);

            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=Login');

            await page.waitForTimeout(interval);
            await page.waitForSelector('form');

            await page.fill('[name="username"]', data.username);
            await page.fill('[name="password"]', data.password);


            const [request] = await Promise.all([
                onRequest(),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(request.postData());
            expect(postData.username).to.equal(data.username);
            expect(postData.password).to.equal(data.password);
        });

        it('logout makes correct API call [ 5 Points ]', async () => {
            const data = mockData.users[0];
            const { post } = await handle(endpoints.login);
            const { get } = await handle(endpoints.logout);
            const { onResponse } = post(data);
            const { onRequest } = get('', { json: false, status: 204 });

            await page.goto(host);
            await page.click('text=Login');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');
            await page.fill('[name="username"]', data.username);
            await page.fill('[name="password"]', data.password);

            await Promise.all([
                onResponse(),
                page.click('[type="submit"]')
            ]);

            await page.waitForTimeout(interval);

            const [request] = await Promise.all([
                onRequest(),
                page.click('nav >> text=Logout')
            ]);

            const token = request.headers()['x-authorization'];
            expect(request.method()).to.equal('GET');
            expect(token).to.equal(data.accessToken);
        });
    });

    describe('Navigation bar [ 5 Points ]', () => {
        it('logged user should see correct navigation [ 2.5 Points ]', async () => {
            // Login user
            const data = mockData.users[0];
            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=Login');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');

            await page.fill('[name="username"]', data.username);
            await page.fill('[name="password"]', data.password);

            await page.click('[type="submit"]');

            //Test for navigation
            await page.waitForTimeout(interval);

            expect(await page.isVisible('nav >> text=All Listings')).to.be.true;
            expect(await page.isVisible('nav >> text=By Year')).to.be.true;
            expect(await page.isVisible('nav >> text=Peter')).to.be.true;
            expect(await page.isVisible('nav >> text=My Listings')).to.be.true;
            expect(await page.isVisible('nav >> text=Create Listing')).to.be.true;
            expect(await page.isVisible('nav >> text=Logout')).to.be.true;

            expect(await page.isVisible('nav >> text=Login')).to.be.false;
            expect(await page.isVisible('nav >> text=Register')).to.be.false;
        });

        it('guest user should see correct navigation [ 2.5 Points ]', async () => {
            await page.goto(host);
            await page.waitForTimeout(interval);

            expect(await page.isVisible('nav >> text=All Listings')).to.be.true;
            expect(await page.isVisible('nav >> text=By Year')).to.be.true;
            expect(await page.isVisible('nav >> text=Login')).to.be.true;
            expect(await page.isVisible('nav >> text=Register')).to.be.true;

            expect(await page.isVisible('nav >> text=Welcome')).to.be.false;
            expect(await page.isVisible('nav >> text=My Listings')).to.be.false;
            expect(await page.isVisible('nav >> text=Create Listing')).to.be.false;
            expect(await page.isVisible('nav >> text=Logout')).to.be.false;
        });
    });

    describe('Catalog [ 25 Points ]', () => {
        it('loads static home page [ 5 Points ]', async () => {
            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.waitForSelector('text=Welcome To Car Tube');

            expect(await page.isVisible('text=To see all the listings click the link below')).to.be.true;
            expect(await page.isVisible('#welcome-container >> text=Listings')).to.be.true;
        });

        it('show all listings [ 10 Points ]', async () => {
            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=All Listings');
            await page.waitForTimeout(interval);
            await page.waitForSelector('#car-listings');

            const titles = await page.$$eval('#car-listings .listing h2', t => t.map(s => s.textContent));

            expect(titles.length).to.equal(3);
            expect(titles[0]).to.contains('brand1 model1');
            expect(titles[1]).to.contains('brand2 model2');
            expect(titles[2]).to.contains('brand3 model3');
        });

        it('show car details [ 5 Points ]', async () => {
            const data = mockData.catalog[0];

            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=All Listings');
            await page.waitForTimeout(interval);
            await page.waitForSelector('#car-listings');
            await page.click('.listing:has-text("brand1") >> text=Details');
            await page.waitForTimeout(interval);
            await page.waitForSelector('.details-info');

            expect(await page.getAttribute('.details-info img', 'src')).to.contains(data.imageUrl);
            expect(await page.textContent('li:has-text("Brand")')).to.contains(data.brand);
            expect(await page.textContent('li:has-text("Model")')).to.contains(data.model);
            expect(await page.textContent('li:has-text("Year")')).to.contains(data.year);
            expect(await page.textContent('li:has-text("Price")')).to.contains(data.price);
        });

        it('guest does NOT see edit/delete buttons [ 5 Points ]', async () => {
            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=All Listings');
            await page.waitForTimeout(interval);
            await page.waitForSelector('#car-listings');
            await page.click('.listing:has-text("brand1") >> text=Details');
            await page.waitForTimeout(interval);
            await page.waitForSelector('.details-info');

            expect(await page.isVisible('text="Delete"')).to.be.false;
            expect(await page.isVisible('text="Edit"')).to.be.false;
        });
    });

    describe('CRUD [ 40 Points ]', () => {

        // Login user
        beforeEach(async () => {
            const data = mockData.users[0];
            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=Login');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');
            await page.fill('[name="username"]', data.username);
            await page.fill('[name="password"]', data.password);
            await page.click('[type="submit"]');
            await page.waitForTimeout(interval);
        });

        it('create does NOT work with empty fields [ 5 Points ]', async () => {
            const { post } = await handle(endpoints.create);
            const isCalled = post().isHandled;

            await page.click('text="Create Listing"');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');

            page.click('[type="submit"]');

            await page.waitForTimeout(interval);

            expect(isCalled()).to.be.false;
        });

        it('create makes correct API call for logged in user [ 10 Points ]', async () => {
            const data = mockData.catalog[0];
            const { post } = await handle(endpoints.create);
            const { onRequest } = post();

            await page.click('text="Create Listing"');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');

            await page.fill('[name="brand"]', data.brand);
            await page.fill('[name="model"]', data.model);
            await page.fill('[name="description"]', data.description);
            await page.fill('[name="year"]', data.year.toString());
            await page.fill('[name="imageUrl"]', data.imageUrl);
            await page.fill('[name="price"]', data.price.toString());

            const [request] = await Promise.all([
                onRequest(),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(request.postData());

            expect(postData.brand).to.equal(data.brand);
            expect(postData.model).to.equal(data.model);
            expect(postData.description).to.equal(data.description);
            expect(postData.year).to.equal(data.year);
            expect(postData.imageUrl).to.equal(data.imageUrl);
            expect(postData.price).to.equal(data.price);
        });

        it('non-author does NOT see delete and edit buttons [ 2.5 Points ]', async () => {
            await page.click('text=All Listings');
            await page.waitForTimeout(interval);
            await page.waitForSelector('#car-listings');
            await page.click('.listing:has-text("brand3") >> text=Details');
            await page.waitForTimeout(interval);
            await page.waitForSelector('.details-info');

            expect(await page.isVisible('text="Delete"')).to.be.false;
            expect(await page.isVisible('text="Edit"')).to.be.false;
        });

        it('author sees delete and edit buttons [ 2.5 Points ]', async () => {
            await page.click('text=All Listings');
            await page.waitForTimeout(interval);
            await page.waitForSelector('#car-listings');
            await page.click('.listing:has-text("brand1") >> text=Details');
            await page.waitForTimeout(interval);
            await page.waitForSelector('.details-info');

            expect(await page.isVisible('text="Delete"')).to.be.true;
            expect(await page.isEnabled('text="Delete"')).to.be.true;
            expect(await page.isVisible('text="Edit"')).to.be.true;
            expect(await page.isEnabled('text="Edit"')).to.be.true;
        });

        it('delete makes correct API call for logged in user [ 5 Points ]', async () => {
            const data = mockData.catalog[0];
            const { get, del } = await handle(endpoints.delete(data._id));
            get(data);
            const { onResponse, isHandled } = del();

            await page.click('text=All Listings');
            await page.waitForTimeout(interval);

            await page.waitForSelector('#car-listings');
            await page.click('.listing:has-text("brand1") >> text=Details');
            await page.waitForTimeout(interval);

            await page.waitForSelector('.details-info');
            await page.waitForTimeout(interval);

            page.on('dialog', dialog => dialog.accept());

            await Promise.all([
                onResponse(),
                page.click('text="Delete"')
            ]);

            expect(isHandled()).to.be.true;
        });

        it('edit does NOT work with empty fields [ 5 Points ]', async () => {
            const data = mockData.catalog[0];
            const { get, put } = await handle(endpoints.delete(data._id));
            get(data);
            const { isHandled } = put();

            await page.click('text=All Listings');
            await page.waitForTimeout(interval);

            await page.waitForSelector('#car-listings');
            await page.click('.listing:has-text("brand1") >> text=Details');
            await page.waitForTimeout(interval);

            await page.waitForSelector('.details-info');
            await page.click('text=Edit');
            await page.waitForTimeout(interval);

            await page.waitForSelector('form');
            await page.fill('[name="brand"]', '');
            await page.fill('[name="model"]', '');
            await page.fill('[name="description"]', '');
            await page.fill('[name="year"]', '');
            await page.fill('[name="imageUrl"]', '');
            await page.fill('[name="price"]', '');

            await page.click('[type="submit"]');
            await page.waitForTimeout(interval);

            expect(isHandled()).to.be.false;
        });

        it('edit should populate form with correct data [ 5 Points ]', async () => {
            const data = mockData.catalog[0];
            const { get } = await handle(endpoints.delete(data._id));
            get(data);

            await page.click('text=All Listings');
            await page.waitForTimeout(interval);
            await page.waitForSelector('#car-listings');
            await page.click('.listing:has-text("brand1") >> text=Details');
            await page.waitForTimeout(interval);
            await page.waitForSelector('.details-info');
            await page.click('text=Edit');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');

            const inputs = await page.$$eval('.container input', t => t.map(i => i.value));
            expect(inputs[0]).to.contains(data.brand);
            expect(inputs[1]).to.contains(data.model);
            expect(inputs[2]).to.contains(data.description);
            expect(inputs[3]).to.contains(data.year);
            expect(inputs[4]).to.contains(data.imageUrl);
            expect(inputs[5]).to.contains(data.price);
        });

        it('edit makes correct API call for logged in user [ 5 Points ]', async () => {
            const data = mockData.catalog[0];
            const { get, put } = await handle(endpoints.delete(data._id));
            get(data);
            const { onRequest } = put();

            await page.click('text=All Listings');
            await page.waitForTimeout(interval);
            await page.waitForSelector('#car-listings');
            await page.click('.listing:has-text("brand1") >> text=Details');
            await page.waitForTimeout(interval);
            await page.waitForSelector('.details-info');
            await page.click('text=Edit');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');

            await page.fill('[name="brand"]', data.brand + 'edit');
            await page.fill('[name="model"]', data.model + 'edit');
            await page.fill('[name="description"]', data.description + 'edit');
            await page.fill('[name="year"]', (data.year + 1).toString());
            await page.fill('[name="imageUrl"]', data.imageUrl + 'edit');
            await page.fill('[name="price"]', (data.price + 1).toString());

            const [request] = await Promise.all([
                onRequest(),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(request.postData());

            expect(postData.brand).to.contains(data.brand + 'edit');
            expect(postData.model).to.contains(data.model + 'edit');
            expect(postData.description).to.contains(data.description + 'edit');
            expect(postData.year).to.equal(data.year + 1);
            expect(postData.imageUrl).to.contains(data.imageUrl + 'edit');
            expect(postData.price).to.equal(data.price + 1);
        });
    });

    describe('User Profile Page [ 10 Points ]', async () => {

        // Login user
        beforeEach(async () => {
            const data = mockData.users[0];
            await page.goto(host);
            await page.waitForTimeout(interval);
            await page.click('text=Login');
            await page.waitForTimeout(interval);
            await page.waitForSelector('form');
            await page.fill('[name="username"]', data.username);
            await page.fill('[name="password"]', data.password);
            await page.click('[type="submit"]');
            await page.waitForTimeout(interval);
        });

        it('check profile page for with 0 listings [ 5 Points ]', async () => {
            const { get } = await handle(endpoints.profile(mockData.users[0]._id));
            get([]);

            await page.click('text=My Listings');
            await page.waitForTimeout(interval);

            const visible = await page.isVisible('text=You haven\'t listed any cars yet');
            expect(visible).to.be.true;
        });

        it('check profile page with 2 listings [ 5 Points ]', async () => {
            const { get } = await handle(endpoints.profile(mockData.users[0]._id));
            get(mockData.catalog.slice(0, 2));

            await page.click('text=My Listings');
            await page.waitForTimeout(interval);

            const titles = await page.$$eval('#my-listings .listing h2', t => t.map(s => s.textContent));

            expect(titles.length).to.equal(2);
            expect(titles[0]).to.contains('brand1 model1');
            expect(titles[1]).to.contains('brand2 model2');
        });
    });

    describe('Search Page [ 5 Points ]', async () => {

        it('show no matches [ 2.5 Points ]', async () => {
            await handle(endpoints.search('2010'), { get: [] });

            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('text=By Year');
            await page.waitForTimeout(interval);

            await page.fill('#search-input', '2010');
            await page.click('button:has-text("Search")');
            await page.waitForTimeout(interval);

            const matches = await page.$$eval('.listing h2', t => t.map(s => s.textContent));

            expect(matches.length).to.be.equal(0);
        });

        it('show results [ 2.5 Points ]', async () => {
            await handle(endpoints.search('2010'), { get: mockData.catalog.slice(0, 2) });

            await page.goto(host);
            await page.waitForTimeout(interval);

            await page.click('text=By Year');
            await page.waitForTimeout(interval);

            await page.fill('#search-input', '2010');
            await page.click('button:has-text("Search")');
            await page.waitForTimeout(interval);

            const matches = await page.$$eval('.listing h2', t => t.map(s => s.textContent));

            expect(matches.length).to.equal(2);
            expect(matches[0]).to.contains('brand1 model1');
            expect(matches[1]).to.contains('brand2 model2');
        });


    });

});

async function setupContext(context) {
    // Authentication
    await handleContext(context, endpoints.login, { post: mockData.users[0] });
    await handleContext(context, endpoints.register, { post: mockData.users[0] });
    await handleContext(context, endpoints.logout, { get: h => h('', { json: false, status: 204 }) });

    // Catalog and Details
    await handleContext(context, endpoints.catalog, { get: mockData.catalog });
    await handleContext(context, endpoints.details('1001'), { get: mockData.catalog[0] });
    await handleContext(context, endpoints.details('1002'), { get: mockData.catalog[1] });
    await handleContext(context, endpoints.details('1003'), { get: mockData.catalog[2] });

    // Profile Page
    await handleContext(context, endpoints.profile('0001'), { get: mockData.catalog.slice(0, 2) });

    // Block external calls
    await context.route(url => url.href.slice(0, host.length) != host, route => {
        if (DEBUG) {
            console.log('Preventing external call to ' + route.request().url());
        }
        route.abort();
    });
}

function handle(match, handlers) {
    return handleRaw.call(page, match, handlers);
}

function handleContext(context, match, handlers) {
    return handleRaw.call(context, match, handlers);
}

async function handleRaw(match, handlers) {
    const methodHandlers = {};
    const result = {
        get: (returns, options) => request('GET', returns, options),
        post: (returns, options) => request('POST', returns, options),
        put: (returns, options) => request('PUT', returns, options),
        patch: (returns, options) => request('PATCH', returns, options),
        del: (returns, options) => request('DELETE', returns, options),
        delete: (returns, options) => request('DELETE', returns, options)
    };

    const context = this;

    await context.route(urlPredicate, (route, request) => {
        if (DEBUG) {
            console.log('>>>', request.method(), request.url());
        }

        const handler = methodHandlers[request.method().toLowerCase()];
        if (handler == undefined) {
            route.continue();
        } else {
            handler(route, request);
        }
    });

    if (handlers) {
        for (let method in handlers) {
            if (typeof handlers[method] == 'function') {
                handlers[method](result[method]);
            } else {
                result[method](handlers[method]);
            }
        }
    }

    return result;

    function request(method, returns, options) {
        let handled = false;

        methodHandlers[method.toLowerCase()] = (route, request) => {
            handled = true;
            route.fulfill(respond(returns, options));
        };

        return {
            onRequest: () => context.waitForRequest(urlPredicate),
            onResponse: () => context.waitForResponse(urlPredicate),
            isHandled: () => handled,
        };
    }

    function urlPredicate(current) {
        if (current instanceof URL) {
            return current.href.toLowerCase().includes(match.toLowerCase());
        } else {
            return current.url().toLowerCase().includes(match.toLowerCase());
        }
    }
};

function respond(data, options = {}) {
    options = Object.assign({
        json: true,
        status: 200
    }, options);

    const headers = {
        'Access-Control-Allow-Origin': '*'
    };
    if (options.json) {
        headers['Content-Type'] = 'application/json';
        data = JSON.stringify(data);
    }

    return {
        status: options.status,
        headers,
        body: data
    };
}