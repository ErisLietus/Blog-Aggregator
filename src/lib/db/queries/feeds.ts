import { readConfig } from "src/config";
import { db } from "..";
import { feeds, Feed, User } from "../schema";
import { getUserById, getUserByName } from "./users";


export async function createFeed(name: string, url: string, userId: string) {
    const [result] = await db.insert(feeds).values({name:name , url: url, users_id: userId}).returning()
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

// handler for the "feeds" command
export async function handlerListFeeds(cmdName: string) {
  
  const feeds = await getFeeds()

  if(feeds.length === 0) {
    throw new Error("There are no feeds")
  }


for (const feed of feeds) {
  const user = await getUserById(feed.userId)

  if (!user) {
    console.log("No feeds found")
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