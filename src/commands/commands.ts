import { User } from "src/lib/db/schema";

export type CommandHandler = (
    cmdname: string,
    ...args:string[]
) => Promise<void>; 

export type CommandsRegistry = Record<string, CommandHandler>;


export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler){
registry[cmdName] = handler;
};


export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]){
    if(!registry[cmdName]){
    throw new Error("Invalid Command")
} else{
   await registry[cmdName](cmdName, ...args)
}
}

