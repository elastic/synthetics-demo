import { journey, Page, step } from '@elastic/synthetics';
import assert from 'assert'

journey("load wiki homepage", ({page}) => {
   loadWikiHomepage(page) 
})

const searchMatches = {
    'elasticsearch': "Elasticsearch",
    'shrek': "Shrek",
    'irs': "IRS",
    'thiswillfailforsure': "falconerch"
}

for (const term in searchMatches) {
    journey(`search for ${term}`, ({page}) => {
        loadWikiHomepage(page)
        searchFor(page, term)
        expectPageTitled(page, "Search results")
        expectTopSearchResult(page, searchMatches[term])
    })
}

journey(`search for non-existant page`, ({page}) => {
    const term = 'Ohuarouaehcruohouerchuoercheoruc'

    loadWikiHomepage(page)
    searchFor(page, term)
    expectPageTitled(page, "Search results")
    step("expect note on missing page", async () => {
        const item = await page.waitForSelector("div.searchresults > p.mw-search-createlink")
        assert.strictEqual(await (await item.textContent()).trim(), `The page "${term}" does not exist. You can ask for it to be created.`)
    })
})

journey("visit a random article", ({page}) => {
    loadWikiHomepage(page)
    step("click random article link", async () => {
        await page.click("#n-randompage a")
    })
    step("assert that we are on an article page", async () => {
        // Probably a better way to do this...
        await page.waitForSelector("body.mw-editable")
    })
})


export const loadWikiHomepage = (page: Page ) => {
    step("load wiki home page", async () => {
        await page.goto("https://en.wikipedia.org")
    })
}

export const searchFor = (page: Page, searchTerm: string) => {
    step(`search for '${searchTerm}' using text box`, async () => {
        await page.type("input#searchInput", searchTerm)
        await page.keyboard.press('Enter')
    })
}

export const expectPageTitled = (page: Page, title: string) => {
    step(`expect wikipedia article page titled '${title}'`, async () => {
        const h1 = await page.waitForSelector(`h1`);
        assert.strictEqual(await h1.textContent(), title)
    })
}

export const expectTopSearchResult = (page: Page, title: string) => {
    step(`expect top search result to be ${title}`, async () => {
        const item = await page.waitForSelector(".mw-searchresults-has-iw > ul > li:nth-child(1) .searchmatch", {timeout: 5000})
        assert.strictEqual(await item.textContent(), title)
    })
}