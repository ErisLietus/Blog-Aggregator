import { getFeedByUrl } from "src/lib/db/queries/feeds";
import {  feed_follows,users,feeds, User } from "src/lib/db/schema";
import { db } from "src/lib/db";
import { readConfig } from "src/config";
import { getUserByName } from "src/lib/db/queries/users";
import { and, eq } from "drizzle-orm";

export async function followCommand(cmdName: string, user: User, ...args: string[]) {
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
    userId: feed_follows.userId,        // was usersId
    feedId: feed_follows.feedId,        // was feedsId
    feedName: feeds.name,
    userName: users.name,
  })
  .from(feed_follows)
  .innerJoin(feeds, eq(feed_follows.feedId, feeds.id))   // was feedsId
  .innerJoin(users, eq(feed_follows.userId, users.id))   // was usersId
  .where(eq(feed_follows.id, newFeedFollow.id));

return result;
}

export async function getFeedFollowsForUser(userId: string){
    return await db
  .select({
    id: feed_follows.id,
    createdAt: feed_follows.createdAt,
    updatedAt: feed_follows.updatedAt,
    userId: feed_follows.userId,        // was usersId
    feedId: feed_follows.feedId,        // was feedsId
    feedName: feeds.name,
    userName: users.name,
  })
  .from(feed_follows)
  .innerJoin(feeds, eq(feed_follows.feedId, feeds.id))   // was feedsId
  .innerJoin(users, eq(feed_follows.userId, users.id))   // was usersId
  .where(eq(feed_follows.userId, userId));
}

export async function followingCommand(cmdName: string, user: User, ...args: string[]) {
  if (args.length !== 0) {
    throw new Error(`usage: ${cmdName} (no arguments)`);
  }

  const config = readConfig();
  const currentUser = await getUserByName(config.currentUserName);
  if (!currentUser) {
    throw new Error("current user not found");
  }

  const follows = await getFeedFollowsForUser(currentUser.id);
  for (const follow of follows) {
    console.log(follow.feedName);
  }
}

export async function unFollow(cmdName:string, user:User, ...args: string[]) {
      if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <url>`);
  }
  const url = args[0];

  const currentUser = await getUserByName(user.name);
  if (!currentUser) {
    throw new Error("current user not found");
  }

  const feed = await getFeedByUrl(url);
  if (!feed) {
    throw new Error(`no feed found with url: ${url}`);
  }

  await deleteFollow(currentUser.id, feed.id);
  console.log(`${currentUser.name} has unfollowed`);
}

export async function deleteFollow(userId: string, feedId: string){ 
await db
  .delete(feed_follows)
  .where(and(
    eq(feed_follows.userId, userId),
    eq(feed_follows.feedId, feedId)
  ))
}

