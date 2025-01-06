import chromium from "@sparticuz/chromium";
import puppeteer, { Page } from "puppeteer";

export interface MetaResult {
  title: string;
  description: string;
  [key: string]: string;
}

export async function metaOG(url: string): Promise<MetaResult> {
  // Try lightweight HTML fetching first
  try {
    const metaTags = await fetchMetaWithFetch(url);
    if (metaTags) return metaTags;
  } catch (err) {
    console.warn(`Fetch method failed, falling back to Puppeteer for: ${url}`);
  }

  // Fallback to Puppeteer
  const browser = await puppeteer.launch({
    executablePath: await chromium.executablePath(),
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let page: Page;

  try {
    page = await browser.newPage();

    // Block images and other unnecessary resources
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const resourceType = req.resourceType();
      if (["image", "stylesheet", "font"].includes(resourceType)) {
        req.abort();
      } else {
        req.continue();
      }
    });

    // Navigate to the page
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const content = await page.content();
    const metaTags = await extractMetaTags(content);

    return metaTags;
  } catch (err) {
    console.error(`Error fetching meta tags for URL: ${url}`, err);
    throw err;
  } finally {
    await browser.close();
  }
}

/**
 * Attempts to fetch meta tags using node-fetch (lightweight option).
 * @param url The URL to fetch metadata from.
 * @returns A MetaResult object if meta tags are found, otherwise null.
 */
async function fetchMetaWithFetch(url: string): Promise<MetaResult | null> {
  const response = await fetch(url);
  const html = await response.text();

  if (!html) {
    throw new Error(`Failed to fetch HTML for URL: ${url}`);
  }

  const metaTags = await extractMetaTags(html);

  return metaTags;
}
/**
 * Extracts meta tags from the HTML content of the page.
 * @param html The raw HTML content of the page.
 * @returns A meta result object with title, description, and other meta tags.
 */
async function extractMetaTags(html: string): Promise<MetaResult> {
  const titleRegex = /<title[^>]*>(.*?)<\/title>/i;
  const ogTitleRegex =
    /<meta[^>]*property=["']og:title["'][^>]*content=["'](.*?)["'][^>]*>/i;
  const twitterTitleRegex =
    /<meta[^>]*name=["']twitter:title["'][^>]*content=["'](.*?)["'][^>]*>/i;
  const descriptionRegex =
    /<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["'][^>]*>/i;

  const titleMatch = titleRegex.exec(html);
  const ogTitleMatch = ogTitleRegex.exec(html);
  const twitterTitleMatch = twitterTitleRegex.exec(html);
  const descriptionMatch = descriptionRegex.exec(html);

  const title = titleMatch
    ? titleMatch[1]
    : ogTitleMatch
    ? ogTitleMatch[1]
    : twitterTitleMatch
    ? twitterTitleMatch[1]
    : "";
  const description = descriptionMatch ? descriptionMatch[1] : "";

  const metaTagRegex =
    /<meta\s+(?=[^>]*\bproperty=(["']?)([^"'\s>]+)\1)(?=[^>]*\bcontent=(["']?)([^"'\s>]+)\3)[^>]*>/gi;

  const meta: { [key: string]: string } = {};
  let match: RegExpExecArray | null;

  while ((match = metaTagRegex.exec(html)) !== null) {
    const key = match[2];
    meta[key] = match[4];
  }

  return { title, description, ...meta };
}
