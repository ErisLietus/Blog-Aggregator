import { createFeedFollow, getFeedByUrl } from "src/lib/db/queries/feeds";
import { User } from "src/lib/db/schema";

export async function followCommand(cmdName:string, user: User, ...args: string[]) {
    if(args.length === 0){
        throw new Error("No URL provided")
    }
    const url = args[0]
    
    const feed = await getFeedByUrl(url);
if (!feed) {
  throw new Error(`No feed found with url: ${url}`);
}
const createdFeed = await createFeedFollow(user.id, feed.id)
console.log(`${user.name} has followed ${feed.name}`)
}