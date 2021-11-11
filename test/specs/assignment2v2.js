describe('My application', () => {
    it('should check if all the search pages are loaded correctly', async () => {
        await browser.url('https://www.bayut.com/');
        await $('//*[@id="body-wrapper"]/main/div[6]/div/div[1]').scrollIntoView();
        await $('//*[@id="body-wrapper"]/main/div[6]/div/div[2]/div[2]/div/div/div[2]').click();
        const linksParent = await $('//*[@id="body-wrapper"]/main/div[6]/div/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/div/div[2]/div[1]/ul');
        const links = await linksParent.$$('a');
        const urlPromises = await links.map(link => link.getAttribute('href'))
        const titlePromises = await links.map(title => title.getAttribute('title'))
        const titles = await Promise.all(titlePromises)
        const urls = await Promise.all(urlPromises)
        for (let i=0;i<urls.length;i++){
            await browser.url("https://www.bayut.com" + urls[i]);
            await expect(browser).toHaveTitleContaining(titles[i]).ignoreCase;
        }
    });
});

