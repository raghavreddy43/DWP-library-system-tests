import { chromium } from '@playwright/test';

async function inspectLocators() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to application...');
    await page.goto('https://frontendui-librarysystem.onrender.com');
    await page.waitForLoadState('networkidle');
    
    console.log('\n=== LOGIN PAGE ELEMENTS ===');
    
    // Check for username input
    const usernameInputs = await page.locator('input').all();
    console.log(`Found ${usernameInputs.length} input fields`);
    
    for (let i = 0; i < usernameInputs.length; i++) {
      const placeholder = await usernameInputs[i].getAttribute('placeholder');
      const name = await usernameInputs[i].getAttribute('name');
      const id = await usernameInputs[i].getAttribute('id');
      const type = await usernameInputs[i].getAttribute('type');
      console.log(`Input ${i}: placeholder="${placeholder}", name="${name}", id="${id}", type="${type}"`);
    }
    
    // Check for buttons
    const buttons = await page.locator('button').all();
    console.log(`\nFound ${buttons.length} buttons`);
    for (let i = 0; i < buttons.length; i++) {
      const text = await buttons[i].textContent();
      const type = await buttons[i].getAttribute('type');
      console.log(`Button ${i}: text="${text?.trim()}", type="${type}"`);
    }
    
    // Check for forms
    const forms = await page.locator('form').all();
    console.log(`\nFound ${forms.length} forms`);
    
    // Check for headings
    const headings = await page.locator('h1, h2, h3').all();
    console.log(`\nFound ${headings.length} headings`);
    for (let i = 0; i < headings.length; i++) {
      const text = await headings[i].textContent();
      console.log(`Heading ${i}: "${text?.trim()}"`);
    }
    
    // Get page HTML structure
    const html = await page.content();
    console.log('\n=== PAGE HTML (first 2000 chars) ===');
    console.log(html.substring(0, 2000));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

inspectLocators();
