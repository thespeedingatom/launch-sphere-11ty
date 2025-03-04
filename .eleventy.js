const rssParser = require("rss-parser");
require("dotenv").config();

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/scripts");
  eleventyConfig.addPassthroughCopy("src/styles");

  eleventyConfig.addGlobalData("news", async () => {
    const fetch = (await import("node-fetch")).default; // Dynamic import for ESM
    const parser = new rssParser();
    const feed = await parser.parseURL(process.env.RSS_FEED_URL || "https://rss.app/feeds/8hfuhHaJJ8XpWp8p.xml");
    const items = feed.items.slice(0, process.env.RSS_ITEM_LIMIT || 10);

    const summarizedItems = await Promise.all(
      items.map(async (item) => {
        try {
          const response = await fetch("https://api.anthropic.com/v1/complete", {
            method: "POST",
            headers: {
              "x-api-key": process.env.ANTHROPIC_API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "claude-3-haiku-20240307",
              prompt: `Summarize: ${item.contentSnippet || item.content}`,
              max_tokens: 50,
            }),
          });
          const data = await response.json();
          return { ...item, summary: data.completion || item.contentSnippet.slice(0, 100) };
        } catch (e) {
          return { ...item, summary: item.contentSnippet.slice(0, 100) };
        }
      })
    );
    return summarizedItems;
  });

  return {
    dir: { input: "src", output: "_site" },
    templateFormats: ["njk", "html"],
  };
};