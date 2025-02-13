import { test, expect } from '@playwright/test';

test("Google search from search box, @googleSearch", async ({ page, context }) => {
  // Delete all cookies before starting the test
  await context.clearCookies();

  await page.goto("https://google.com/");
  const searchBox = page.locator("//textarea[@class='gLFyf']");
  await searchBox.fill("French Bulldog");
  await searchBox.press("Enter");
  //verifying that every link contains the search words
  const links = await page.locator('h3').all();
  for (const link of links) {
    const linkText = await link.textContent();
    expect(linkText?.toLowerCase()).toContain('french bulldog');
  }
})
