import { test, expect } from '@playwright/test';

test('Diagnostic: Check books page structure', async ({ page }) => {
  console.log('\n=== DIAGNOSTIC BOOKS PAGE TEST ===');
  
  try {
    // First login
    console.log('Navigating to login page...');
    await page.goto('https://frontendui-librarysystem.onrender.com/login', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    
    await page.waitForTimeout(2000);
    
    // Fill login form
    console.log('Logging in...');
    await page.fill('#username', 'admin');
    await page.fill('#password', 'admin');
    await page.click('button[type="submit"]');
    
    // Wait for navigation to books page
    await page.waitForTimeout(3000);
    
    const url = page.url();
    console.log(`Current URL after login: ${url}`);
    
    // Get the root HTML
    const rootHTML = await page.locator('#root').innerHTML();
    console.log(`\n=== ROOT HTML (first 3000 chars) ===`);
    console.log(rootHTML.substring(0, 3000));
    
    // Check for add book button
    const hasAddButton = rootHTML.includes('Add') || rootHTML.includes('add');
    console.log(`\nHas 'Add' text: ${hasAddButton}`);
    
    // Check for table
    const hasTable = rootHTML.includes('<table') || rootHTML.includes('table');
    console.log(`Has table: ${hasTable}`);
    
    // Check for form inputs
    const hasInputs = rootHTML.includes('<input');
    console.log(`Has inputs: ${hasInputs}`);
    
    // Get all buttons
    const buttons = await page.locator('button').all();
    console.log(`\nFound ${buttons.length} buttons`);
    for (let i = 0; i < Math.min(10, buttons.length); i++) {
      const text = await buttons[i].textContent();
      const type = await buttons[i].getAttribute('type');
      console.log(`  Button ${i}: text="${text?.trim()}", type="${type}"`);
    }
    
    // Get all inputs
    const inputs = await page.locator('input').all();
    console.log(`\nFound ${inputs.length} inputs`);
    for (let i = 0; i < Math.min(10, inputs.length); i++) {
      const placeholder = await inputs[i].getAttribute('placeholder');
      const name = await inputs[i].getAttribute('name');
      const id = await inputs[i].getAttribute('id');
      const type = await inputs[i].getAttribute('type');
      console.log(`  Input ${i}: id="${id}", name="${name}", placeholder="${placeholder}", type="${type}"`);
    }
    
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
});
