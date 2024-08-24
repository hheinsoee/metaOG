import axios from 'axios';

export async function metaOG(url: string): Promise<{ [key: string]: string }> {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const metaTags = extractMetaTags(html);
    return parseOpenGraphData(metaTags);
  } catch (error) {
    throw new Error(`Failed to fetch OpenGraph data: ${error}`);
  }
}

function extractMetaTags(html: string): { [key: string]: string } {
  const metaTagRegex = /<meta\s+[^>]*property=["'](og:[^"']+)["'][^>]*content=["']([^"']+)["'][^>]*>/gi;
  const metaTags: { [key: string]: string } = {};
  let match: RegExpExecArray | null;

  while ((match = metaTagRegex.exec(html)) !== null) {
    metaTags[match[1]] = match[2];
  }

  return metaTags;
}

function parseOpenGraphData(metaTags: { [key: string]: string }): { [key: string]: string } {
  const ogData: { [key: string]: string } = {};
  for (const property in metaTags) {
    if (property.startsWith('og:')) {
      ogData[property] = metaTags[property];
    }
  }
  return ogData;
}
