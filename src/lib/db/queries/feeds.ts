import { readConfig } from "src/config";
import { db } from "..";
import { feeds, Feed, User, users, feed_follows } from "../schema";
import { getUserById, getUserByName } from "./users";
import { eq } from "drizzle-orm";


export async function createFeed(name: string, url: string, userId: string) {
    const [result] = await db.insert(feeds).values({name:name , url: url, usersId: userId}).returning()
    return result
  
}

function printFeed(feed: Feed, user: User) {
  console.log(`ID:        ${feed.id}`);
  console.log(`Name:      ${feed.name}`);
  console.log(`URL:       ${feed.url}`);
  console.log(`User:      ${user.name}`);
  console.log(`Created:   ${feed.createdAt}`);
  console.log(`Updated:   ${feed.updatedAt}`);
}

export async function handlerAddFeed(cmdName: string, ...args: string[]) {
  if (args.length !== 2) {
    throw new Error(`usage: addfeed <name> <url>`);
  }
  const [feedName, feedUrl] = args;

  const config = readConfig();
  const currentUser = await getUserByName(config.currentUserName);
  if (!currentUser) {
    throw new Error("current user not found");
  }

  const feed = await createFeed(feedName, feedUrl, currentUser.id);
  printFeed(feed, currentUser);
}

export async function handlerListFeeds(cmdName: string) {
  
  const feeds = await getFeeds()

  if(feeds.length === 0) {
    throw new Error("There are no feeds")
  }

for (const feed of feeds) {
  const user = await getUserById(feed.usersId)

  if (!user) {
    console.log("No users found")
    return
  }

  console.log(feed.name)
  console.log(feed.url)
  console.log(user.name) 

}
}

export async function getFeeds() {
  const result = await db.select().from(feeds)
  return result
}

export async function createFeedFollow(userId: string, feedId: string) {
  const [newFeedFollow] = await db
  .insert(feed_follows)
  .values({ userId, feedId })
  .returning();

  const [result] = await db
  .select({
    id: feed_follows.id,
    createdAt: feed_follows.createdAt,
    updatedAt: feed_follows.updatedAt,
    userId: feed_follows.userId,
    feedId: feed_follows.feedId,
    feedName: feeds.name,
    userName: users.name,
  })
  .from(feed_follows)
  .innerJoin(feeds, eq(feed_follows.feedId, feeds.id))
  .innerJoin(users, eq(feed_follows.userId, users.id))
  .where(eq(feed_follows.id, newFeedFollow.id));

return result;
}

export async function followCommand(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <url>`);
  }
  const url = args[0];

  const config = readConfig();
  const currentUser = await getUserByName(config.currentUserName);
  if (!currentUser) {
    throw new Error("current user not found");
  }

  const feed = await getFeedByUrl(url);
  if (!feed) {
    throw new Error(`no feed found with url: ${url}`);
  }

  const result = await createFeedFollow(currentUser.id, feed.id);
  console.log(`${result.userName} now follows ${result.feedName}`);
}