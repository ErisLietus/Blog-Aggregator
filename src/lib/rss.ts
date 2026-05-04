
import { XMLParser } from "fast-xml-parser"

export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

export type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};


export async function fetchFeed(feedURL: string){
    const feed =  await fetch(feedURL, {headers: { "User-Agent": "gator"}})
    if (!feed.ok){
        throw new Error("Feed error.")
    }
    const XMLString = await feed.text()

    const parser = new XMLParser({ processEntities: false});
    const parsed = parser.parse(XMLString)

    const channel = parsed.rss?.channel
    if(!channel){
        throw new Error("No channel error")
    }
    if(!channel.title || !channel.link || !channel.description){
        throw new Error(" Missing title, link or description")
    }
    const items = Array.isArray(channel.item) ? channel.item : [channel.item];

    const rssItem = []

    for (const item of items){
        if(item.title && item.link && item.description && item.pubDate ){
            rssItem.push(item)
        }
    }

    const rss: RSSFeed = {
        channel:{
            title: channel.title,
            link: channel.link,
            description: channel.description,
            item: rssItem
        }
    };
    return rss 
}