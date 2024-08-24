import { metaOG } from "./index";

describe("metaOG", () => {
  it("valid URL", async () => {
    const url = "https://www.heinsoe.com"; // Replace with a URL that contains Open Graph meta tags
    const ogData = await metaOG(url);

    expect(ogData).toHaveProperty("og:title");
    // expect(ogData).toHaveProperty("og:type");
    expect(ogData).toHaveProperty("og:url");
  });

//   it("should handle errors gracefully for an invalid URL", async () => {
//     const invalidUrl = "https://invalid.url";

//     await expect(metaOG(invalidUrl)).rejects.toThrow(
//       "Failed to fetch OpenGraph data"
//     );
//   });
});
