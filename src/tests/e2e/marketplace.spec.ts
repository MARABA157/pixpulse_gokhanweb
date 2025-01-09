import { test, expect } from '@playwright/test';

test.describe('Marketplace E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Go to marketplace page
    await page.goto('/marketplace');
  });

  test('should display NFT listings', async ({ page }) => {
    // Wait for NFT grid to be visible
    await expect(page.locator('.nft-grid')).toBeVisible();
    
    // Check if multiple NFT cards are present
    const nftCards = await page.locator('.nft-card').count();
    expect(nftCards).toBeGreaterThan(0);
  });

  test('should filter NFTs', async ({ page }) => {
    // Open filter menu
    await page.click('text=Filters');
    
    // Select price range
    await page.fill('input[type="range"]', '50');
    
    // Apply filters
    await page.click('text=Apply Filters');
    
    // Wait for filtered results
    await expect(page.locator('.nft-card')).toBeVisible();
    
    // Verify filter badge is shown
    await expect(page.locator('.filter-badge')).toBeVisible();
  });

  test('should sort NFTs', async ({ page }) => {
    // Open sort menu
    await page.click('text=Sort By');
    
    // Select price ascending
    await page.click('text=Price: Low to High');
    
    // Wait for sorted results
    await expect(page.locator('.nft-card')).toBeVisible();
    
    // Get prices and verify they're in ascending order
    const prices = await page.$$eval('.nft-price', elements =>
      elements.map(el => parseFloat(el.textContent.replace('ETH', '')))
    );
    
    const isSorted = prices.every((price, i) => i === 0 || price >= prices[i - 1]);
    expect(isSorted).toBeTruthy();
  });

  test('should handle NFT purchase flow', async ({ page }) => {
    // Click on first NFT card
    await page.click('.nft-card:first-child');
    
    // Wait for NFT details page
    await expect(page.locator('.nft-details')).toBeVisible();
    
    // Click buy button
    await page.click('text=Buy Now');
    
    // Handle wallet connection if needed
    if (await page.isVisible('text=Connect Wallet')) {
      await page.click('text=Connect Wallet');
      // Handle wallet connection modal
      await page.click('text=MetaMask');
    }
    
    // Confirm purchase
    await page.click('text=Confirm Purchase');
    
    // Wait for success message
    await expect(page.locator('text=Purchase successful!')).toBeVisible();
  });

  test('should implement infinite scroll', async ({ page }) => {
    // Get initial number of NFTs
    const initialCount = await page.locator('.nft-card').count();
    
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Wait for more NFTs to load
    await page.waitForTimeout(1000);
    
    // Get new count
    const newCount = await page.locator('.nft-card').count();
    expect(newCount).toBeGreaterThan(initialCount);
  });

  test('should handle search functionality', async ({ page }) => {
    // Type in search box
    await page.fill('input[type="search"]', 'art');
    
    // Wait for search results
    await expect(page.locator('.search-results')).toBeVisible();
    
    // Click on a search result
    await page.click('.search-result:first-child');
    
    // Verify navigation to NFT details
    await expect(page.locator('.nft-details')).toBeVisible();
  });

  test('should handle responsive layout', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.mobile-menu-button')).toBeVisible();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('.tablet-layout')).toBeVisible();
    
    // Test desktop view
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('.desktop-layout')).toBeVisible();
  });

  test('should handle error states', async ({ page }) => {
    // Simulate offline mode
    await page.route('**/*', route => route.abort());
    
    // Refresh page
    await page.reload();
    
    // Check for error message
    await expect(page.locator('text=Failed to load NFTs')).toBeVisible();
    
    // Check retry button
    await expect(page.locator('text=Try Again')).toBeVisible();
  });
});
