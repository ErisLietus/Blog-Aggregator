
import { getPostsForUsers } from "src/lib/db/queries/posts";
import { User } from "src/lib/db/schema";

export async function handlerBrowse(cmdName: string, user : User, ...args: string[]) {
    let limit = 2
if (args.length === 1) {
  limit = parseInt(args[0])
}

const posts = await getPostsForUsers(user.id, limit)

for (const post of posts) {
  console.log(post.title)
  console.log(post.description)
  console.log(post.url)
  // etc.
}

}