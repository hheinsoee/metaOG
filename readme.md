# meta-og: Server-Side Metadata Extraction Library

`meta-og` is a lightweight library for extracting metadata, including the title and meta tags, from web pages. Designed for server-side environments, it utilizes a two-step process for efficiency. It first attempts to fetch metadata using a lightweight approach and falls back to Puppeteer for more complex pages.

---

## Features

- **Title and Meta Tag Extraction**: Extract `title`, `description`, and `og:`/`twitter:` meta tags.
- **Optimized Performance**: Minimizes resource usage by blocking unnecessary assets like images and fonts when using Puppeteer.
- **Fallback Mechanism**: Uses Puppeteer if lightweight fetching fails.
- **Compatible with Serverless Environments**: Utilizes `@sparticuz/chromium` for compatibility with serverless platforms like AWS Lambda.

---

## Installation

```bash
npm install meta-og @sparticuz/chromium puppeteer
```

---

## Usage

### Example

```typescript
import { metaOG } from "meta-og";

(async () => {
  const url = "https://example.com";
  try {
    const metadata = await metaOG(url);
    console.log("Metadata:", metadata);
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }
})();
```

### Output

```json
{
  "title": "Example Domain",
  "description": "This domain is for use in illustrative examples in documents.",
  "og:title": "Example Domain",
  "og:description": "Illustrative examples in documents."
}
```

---

## API Reference

### `metaOG(url: string): Promise<MetaResult>`

Fetches metadata from the given URL.

#### Parameters
- `url` (string): The URL of the web page to fetch metadata from.

#### Returns
- `MetaResult`: An object containing the title, description, and other meta tags.

#### Example
```typescript
const metadata = await metaOG("https://example.com");
console.log(metadata.title); // Outputs: Example Domain
```

### `MetaResult` Interface

Defines the structure of the returned metadata object.

| Key           | Type   | Description                                          |
|---------------|--------|------------------------------------------------------|
| `title`       | string | The title of the web page.                           |
| `description` | string | The description meta tag of the web page.           |
| `[key: string]` | string | Additional meta tags (e.g., `og:title`, `og:image`). |

---

## Internals

### Lightweight Fetch Method
The library first attempts to fetch metadata using `fetch` for improved performance. 

### Puppeteer Fallback
If the lightweight method fails, Puppeteer launches a headless browser to fetch metadata from JavaScript-rendered pages.

---

## Advanced Configuration

### Puppeteer Options
The Puppeteer instance is configured to run in headless mode with options to minimize resource usage:
- Blocks images, fonts, and stylesheets.
- Uses `@sparticuz/chromium` for compatibility with serverless environments.

### Custom Extraction Logic
The `extractMetaTags` function uses regular expressions to parse metadata directly from HTML. You can modify this logic for specific requirements.

---

## Error Handling
If an error occurs during the metadata fetching process, it is logged, and an exception is thrown to notify the caller.

---

## License
This library is open-source and available under the MIT License.

---

For issues or contributions, feel free to visit the [GitHub repository](https://github.com/hheinsoee/meta-og).