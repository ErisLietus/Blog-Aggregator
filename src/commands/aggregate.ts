

import { getNextFeedToFetch, markFeedFetched } from "src/lib/db/queries/feeds";
import { createPost } from "src/lib/db/queries/posts";
import { fetchFeed } from "src/lib/rss"
import { parseDuration } from "src/lib/time";

export async function handlerAgg(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <time_between_reqs>`);
  }

  const timeBetweenRequests = parseDuration(args[0]);
  if (!timeBetweenRequests) {
    throw new Error(`invalid duration: ${args[0]}`);
  }

  console.log(`Collecting feeds every ${args[0]}...`);

  scrapeFeeds().catch(handleError);

    const interval = setInterval(() => {
    scrapeFeeds().catch(handleError);
}, timeBetweenRequests);

await new Promise<void>((resolve) => {
  process.on("SIGINT", () => {
    console.log("Shutting down feed aggregator...");
    clearInterval(interval);
    resolve();
  });
});

}

export async function scrapeFeeds() {
    const nextFeed = await getNextFeedToFetch()
    if(!nextFeed){
        console.log("No more feeds exiting")
        return 
    }
    await markFeedFetched(nextFeed.id)
    const feed = await fetchFeed(nextFeed.url)

    for(const item of feed.channel.item){
        await createPost({
        url: item.link,
        title: item.title,
        description: item.description,
        publishedAt: new Date(item.pubDate),
        feedId: nextFeed.id,
        createdAt: new Date(),
        updatedAt: new Date(),
})
    }

}

function handleError(err: unknown) {
  console.error(
    `Error scraping feeds: ${err instanceof Error ? err.message : err}`
  );
}