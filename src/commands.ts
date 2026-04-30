
import { setUser } from "./config";

export type CommandHandler = (
    cmdname: string,
    ...args:string[]
) => void; 

export type CommandsRegistry = Record<string, CommandHandler>;

export function handlerLogin(cmdName: string, ...args: string[]){
if (args.length === 0){
    throw new Error("Missing user name.")
}
setUser(args[0])
console.log(`user ${args[0]} has been set`)
};

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler){
registry[cmdName] = handler;
};

export function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]){
if(!registry[cmdName]){
    throw new Error("Invalid Command")
} else{
    registry[cmdName](cmdName, ...args)
}
};