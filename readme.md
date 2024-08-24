# metaOG

**metaOG** is a lightweight Node.js utility that fetches Open Graph (OG) metadata from a given URL. It can be used in web applications to display link previews, such as titles, descriptions, and images, by extracting OG tags from the target web page.

## Installation

You can install the package using npm:

```bash
 npm i meta-og
```

## Usage

Here’s a quick example of how to use metaOG in your TypeScript project:

```ts
import { metaOG } from "meta-og";

(async () => {
  try {
    const data = await metaOG("https://www.heinsoe.com");
    console.log(data);
  } catch (error) {
    console.error({ error });
  }
})();
``;
```

## Output Example

The output of metaOG is an object containing the fetched Open Graph data:

```json
{
  "og:title": "Hein Soe",
  "og:description": "Application Developer and Freelance Web Developer",
  "og:url": "https://www.heinsoe.com",
  "og:image": "https://www.heinsoe.com/og-image.png"
  //others....
}
```
## Key Features
- Lightweight: Simple and easy to integrate with any Node.js or web application.
- Flexible: Supports a wide range of Open Graph metadata properties.
- Promise-based: Easily integrates with async/await or .then/.catch syntax.
## Common Use Cases
- Displaying rich link previews.
- Enhancing social media sharing with detailed OG data.
- Building custom link preview components.
## Error Handling
- Make sure to handle errors properly when fetching OG data. The example above shows a basic structure using try/catch for async/await syntax or .catch for promise-based syntax.