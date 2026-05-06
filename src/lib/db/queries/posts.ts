import { db } from "..";
import { feed_follows, feeds, NewPost, posts, users } from "../schema";

export async function createPost(post:NewPost) {
    const [result] = await db.insert(posts).values(post).returning()
    return result
}

export async function getPostsForUsers(userId: string, limit: number) {
     const result = await db.select({
  id: posts.id,
  title: posts.title,
  url: posts.url,
  description: posts.description,
  publishedAt: posts.publishedAt,
  feedId: posts.feedId,
})
  .from(posts)
  .innerJoin(feed_follows, eq(posts.feedId, feed_follows.feedId))
  .innerJoin(feeds, eq(posts.feedId, feeds.id))
  .where(eq(feed_follows.userId,userId))
  .orderBy(desc(posts.publishedAt))
  .limit(limit)
return result
}
