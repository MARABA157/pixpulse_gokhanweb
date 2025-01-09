import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { expect } from '@jest/globals';

const THRESHOLD = {
  performance: 0.8,
  accessibility: 0.9,
  'best-practices': 0.9,
  seo: 0.9,
  pwa: 0.7,
};

describe('Lighthouse Performance Tests', () => {
  let chrome: chromeLauncher.ChromeLauncher;
  let results: { [key: string]: any };

  beforeAll(async () => {
    // Launch Chrome
    chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--no-sandbox'],
    });

    // Run Lighthouse
    const options = {
      logLevel: 'info',
      output: 'json',
      port: chrome.port,
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'],
    };

    results = await lighthouse('http://localhost:3000', options);
  });

  afterAll(async () => {
    // Close Chrome
    await chrome.kill();
  });

  test('meets performance threshold', async () => {
    const score = results.lhr.categories.performance.score;
    expect(score).toBeGreaterThanOrEqual(THRESHOLD.performance);
  });

  test('meets accessibility threshold', async () => {
    const score = results.lhr.categories.accessibility.score;
    expect(score).toBeGreaterThanOrEqual(THRESHOLD.accessibility);
  });

  test('meets best practices threshold', async () => {
    const score = results.lhr.categories['best-practices'].score;
    expect(score).toBeGreaterThanOrEqual(THRESHOLD['best-practices']);
  });

  test('meets SEO threshold', async () => {
    const score = results.lhr.categories.seo.score;
    expect(score).toBeGreaterThanOrEqual(THRESHOLD.seo);
  });

  test('meets PWA threshold', async () => {
    const score = results.lhr.categories.pwa.score;
    expect(score).toBeGreaterThanOrEqual(THRESHOLD.pwa);
  });

  test('First Contentful Paint is fast enough', async () => {
    const fcp = results.lhr.audits['first-contentful-paint'].numericValue;
    expect(fcp).toBeLessThan(2000); // 2 seconds
  });

  test('Time to Interactive is acceptable', async () => {
    const tti = results.lhr.audits['interactive'].numericValue;
    expect(tti).toBeLessThan(3500); // 3.5 seconds
  });

  test('Total Blocking Time is minimal', async () => {
    const tbt = results.lhr.audits['total-blocking-time'].numericValue;
    expect(tbt).toBeLessThan(300); // 300 milliseconds
  });

  test('Cumulative Layout Shift is minimal', async () => {
    const cls = results.lhr.audits['cumulative-layout-shift'].numericValue;
    expect(cls).toBeLessThan(0.1); // Google's recommended threshold
  });

  test('Largest Contentful Paint is fast enough', async () => {
    const lcp = results.lhr.audits['largest-contentful-paint'].numericValue;
    expect(lcp).toBeLessThan(2500); // 2.5 seconds
  });
});
