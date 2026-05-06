import { User } from "./lib/db/schema";
import { CommandHandler } from "./commands/commands";
import { readConfig } from "./config";
import { getUserByName } from "./lib/db/queries/users";


export type UserCommandHandler = (
  cmdName: string,
  user: User,
  ...args: string[]
) => Promise<void>;

export type middlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;

export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler{
    return async (cmdName: string, ...args: string[]) => {
        const config = readConfig();
        const userName = config.currentUserName
        if (!userName){
            throw new Error("Missing user")
        }
        const user = await getUserByName(userName)
        if(!user){
            throw new Error("No user")
        }
        await handler(cmdName, user, ...args)
    } ;
}