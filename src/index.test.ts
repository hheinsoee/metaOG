import { metaOG } from ".";

describe("metaOG", () => {
  it("open graph phase", async () => {
    const url = "https://www.bbc.com/news/live/c5y8xkejjn3t";
    const ogData = await metaOG(url);

    expect(ogData).toHaveProperty("title");
    expect(ogData).toHaveProperty("description");
    expect(ogData).toHaveProperty("og:image");
  });
});
