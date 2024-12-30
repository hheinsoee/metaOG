export interface MetaResult {
  title: string;
  description: string;
  [key: string]: string;
}
export async function metaOG(url: string): Promise<MetaResult> {
  console.log(url);
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    const html = await response.text();
    const metaTags = extractMetaTags(html);
    return metaTags;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch OpenGraph data: ${error}`);
  }
}

function extractMetaTags(html: string): {
  title: string;
  description: string;
  [key: string]: string;
} {
  const titleRegex = /<title[^>]*>(.*?)<\/title>/i;
  const descriptionRegex =
    /<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["'][^>]*>/i;

  const titleMatch = titleRegex.exec(html);
  const descriptionMatch = descriptionRegex.exec(html);
  const title = titleMatch ? titleMatch[1] : "";
  const description = descriptionMatch ? descriptionMatch[1] : "";

  const metaTagRegex =
    /<meta\s+(?=[^>]*\bproperty=(["']?)([^"'\s>]+)\1)(?=[^>]*\bcontent=(["']?)([^"'\s>]+)\3)[^>]*>/gi;

  const meta: { [key: string]: string } = {};
  let match: RegExpExecArray | null;

  while ((match = metaTagRegex.exec(html)) !== null) {
    const key = match[2]; // Remove 'og:' prefix
    meta[key] = match[4];
  }

  console.log({ title, description, ...meta });
  return { title, description, ...meta };
}
