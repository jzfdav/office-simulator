import { test, expect } from '@playwright/test';

test('App Start - Basic Flow', async ({ page }) => {
    await page.goto('/');

    // 1. Check for Intro Overlay
    await expect(page.locator('text=This app shows what a normal office day feels like')).toBeVisible();

    // 2. Dismiss Intro
    await page.click('.intro-overlay');
    await expect(page.locator('.intro-overlay')).not.toBeVisible();

    // 3. Verify Main Display
    // Because time is dynamic, we check for presence of ANY activity text from our list
    // or just the structure.
    await expect(page.locator('.activity-label')).toBeVisible();
    await expect(page.locator('.activity-context')).toBeVisible();
});

test('Settings Modal', async ({ page }) => {
    await page.goto('/');
    await page.click('.intro-overlay'); // Dismiss

    // Open Settings
    await page.click('.settings-trigger');
    await expect(page.locator('text=Preferences')).toBeVisible();

    // Close Settings
    await page.click('button:has-text("Save")');
    await expect(page.locator('text=Workday Window')).not.toBeVisible();
});
