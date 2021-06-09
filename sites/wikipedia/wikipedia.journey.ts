import { journey, Page, step } from '@elastic/synthetics';

journey("load wiki homepage", ({page}) => {
   loadWikiHomepage(page) 
})

journey("search for elastic", ({page}) => {
    loadWikiHomepage(page)
    searchFor(page, "elastic")
})

export const loadWikiHomepage = (page: Page ) => {
    step("load wiki home page", async () => {
        await page.goto("https://en.wikipedia.org")
    })
}

export const searchFor(page: Page, searchTerm: string) {
    step(`search for '${searchTerm}' using text box`, async () => {
        page.type("input#searchInput", searchTerm)
        page.keyboard.press('enter')
    })
}