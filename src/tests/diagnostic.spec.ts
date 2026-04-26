import { test, expect } from '@playwright/test';

test('Diagnostic: Check if application loads', async ({ page }) => {
  console.log('\n=== DIAGNOSTIC TEST ===');
  
  try {
    console.log('Navigating to login page...');
    await page.goto('https://frontendui-librarysystem.onrender.com/login', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    
    console.log('Page loaded, waiting for React app to hydrate...');
    
    // Wait for React app to render
    await page.waitForFunction(() => {
      const root = document.getElementById('root');
      return root && root.children.length > 0;
    }, { timeout: 60000 }).catch(err => {
      console.log('waitForFunction timeout, continuing anyway');
    });
    
    await page.waitForTimeout(3000);
    
    // Get the root HTML
    const rootHTML = await page.locator('#root').innerHTML();
    console.log(`\n=== ROOT HTML (first 2000 chars) ===`);
    console.log(rootHTML.substring(0, 2000));
    
    // Check for specific elements
    const hasLoginContainer = rootHTML.includes('login') || rootHTML.includes('Login');
    console.log(`\nHas 'login' text: ${hasLoginContainer}`);
    
    // Try to find inputs in the HTML
    const hasInputInHTML = rootHTML.includes('<input');
    console.log(`Has <input in HTML: ${hasInputInHTML}`);
    
    // Check for specific input types
    const hasPasswordInput = rootHTML.includes('type="password"');
    console.log(`Has password input: ${hasPasswordInput}`);
    
    // Get all text content
    const bodyText = await page.locator('body').textContent();
    console.log(`\nBody text (first 500 chars):`);
    console.log(bodyText?.substring(0, 500));
    
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
});
