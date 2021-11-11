describe('My application', () => {
    it('results should match the search criteria', async () => {
        await browser.url('https://www.bayut.com/');
        await expect(browser).toHaveTitle('Bayut: UAE\'s Largest Real Estate Portal');

        await $('._5176f8e1=purpose').click();
        await $('[aria-label="Buy"]').click();

        const searchInput = await $('//*[@id="body-wrapper"]/header/div[4]/div/div[2]/div/div[1]/div[2]/div/div/ul/input');
        await searchInput.setValue('dubai marina');
        await browser.pause(200);

        await browser.keys("Enter");
        await $('//*[@id="body-wrapper"]/header/div[4]/div/div[2]/div/div[2]/a').click();
        await browser.pause(5000);

        await expect(browser).toHaveTitle("Properties for Sale in Dubai Marina | Bayut.com");
        const articles = await $$('[aria-label = Location]');
        articles.forEach(async element  => {
            await expect(element).toHaveTextContaining('Dubai Marina');
        });        
    });
}); 