import { fetchFeed } from "src/lib/rss"

export async function handlerAgg(cmdName: string){
const URL = "https://www.wagslane.dev/index.xml"

const data = await fetchFeed(URL);

console.log(JSON.stringify(data, null, 2))
}