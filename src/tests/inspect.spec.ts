import { test, Page } from '@playwright/test';

test('Inspect application locators', async ({ page }) => {
  console.log('\n=== INSPECTING APPLICATION LOCATORS ===\n');
  
  await page.goto('https://frontendui-librarysystem.onrender.com');
  await page.waitForLoadState('networkidle');
  
  console.log('=== LOGIN PAGE ELEMENTS ===');
  
  // Get all inputs
  const inputs = await page.locator('input').all();
  console.log(`\nFound ${inputs.length} input fields:`);
  for (let i = 0; i < inputs.length; i++) {
    const placeholder = await inputs[i].getAttribute('placeholder');
    const name = await inputs[i].getAttribute('name');
    const id = await inputs[i].getAttribute('id');
    const type = await inputs[i].getAttribute('type');
    const value = await inputs[i].getAttribute('value');
    console.log(`  Input ${i}: type="${type}", placeholder="${placeholder}", name="${name}", id="${id}", value="${value}"`);
  }
  
  // Get all buttons
  const buttons = await page.locator('button').all();
  console.log(`\nFound ${buttons.length} buttons:`);
  for (let i = 0; i < buttons.length; i++) {
    const text = await buttons[i].textContent();
    const type = await buttons[i].getAttribute('type');
    const id = await buttons[i].getAttribute('id');
    const className = await buttons[i].getAttribute('class');
    console.log(`  Button ${i}: text="${text?.trim()}", type="${type}", id="${id}", class="${className}"`);
  }
  
  // Get all links
  const links = await page.locator('a').all();
  console.log(`\nFound ${links.length} links:`);
  for (let i = 0; i < Math.min(5, links.length); i++) {
    const text = await links[i].textContent();
    const href = await links[i].getAttribute('href');
    console.log(`  Link ${i}: text="${text?.trim()}", href="${href}"`);
  }
  
  // Get page structure
  const bodyHTML = await page.locator('body').innerHTML();
  console.log(`\n=== PAGE BODY HTML (first 3000 chars) ===`);
  console.log(bodyHTML.substring(0, 3000));
});
