
import { readConfig, setUser } from "../config"
import { createUser, getUserByName, getUsers } from "../lib/db/queries/users"


export async function handlerLogin(cmdName: string, ...args: string[]){
if (args.length === 0){
    throw new Error("Missing user name.")
}
const exists = await getUserByName(args[0]);
if(!exists){
    throw new Error("User does not exist")
}
setUser(args[0])
console.log(`user ${args[0]} has been set`)}

export async function handlerRegister(cmdName: string, ...args: string[]) {
    if (args.length === 0) {
        throw new Error("name is missing");
    }
    const exists = await getUserByName(args[0])
    if (exists){
        throw new Error(`user ${args[0]} already exists`);
    }
    await createUser(args[0])
    setUser(args[0])
    console.log(`The user ${args[0]} has been registered`)
    }
    
  
export async function handlerGetUsers(cmdName: string) {
   const currentUser =  readConfig();
   const users = await getUsers();
   for (const user of users){
    if(user.name === currentUser.currentUserName){
        console.log(`* ${user.name} (current)`)
    } else{
        console.log(`* ${user.name}`)
    }
   }
}