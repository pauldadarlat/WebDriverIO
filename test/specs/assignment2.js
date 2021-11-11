const fetch = require("node-fetch")
describe('My application', () => {
    it('should check if all the links are working correctly', async () => {
        await browser.url('https://www.bayut.com/');
        await $('//*[@id="body-wrapper"]/main/div[6]/div/div[1]').scrollIntoView();
        await $('//*[@id="body-wrapper"]/main/div[6]/div/div[2]/div[2]/div/div/div[2]').click();
        const linksParent = await $('//*[@id="body-wrapper"]/main/div[6]/div/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/div/div[2]/div[1]/ul');
        const links = await linksParent.$$('a');
        const urlPromises = await links.map(link => link.getAttribute('href'))
        const urls = await Promise.all(urlPromises)
        const requests = await urls.map(url => fetch("https://www.bayut.com"+url));
        const responses = await Promise.all(requests);
        const statusCodes = responses.map(response => response.status);
        statusCodes.forEach(statusCode => {
            expect(statusCode).toEqual(200);
        })
    });
});

