import { metaOG } from ".";

describe("metaOG", () => {
  jest.setTimeout(15000);

  it("open graph phase", async () => {
    const url =
      "https://eastasiaforum.org/2025/01/05/us-china-relations-in-2025-great-power-groundhog-day";
    // const url = "https://www.heinsoe.com";
    const ogData = await metaOG(url);
    console.log(ogData);
    expect(ogData).toHaveProperty("title");
    expect(ogData).toHaveProperty("description");
    expect(ogData).toHaveProperty("og:image");
  });
});
