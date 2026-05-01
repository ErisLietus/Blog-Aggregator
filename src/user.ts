
import { setUser } from "./config"
import { createUser, getUserByName } from "./lib/db/queries/users"

export async function handlerLogin(cmdName: string, ...args: string[]){
if (args.length === 0){
    throw new Error("Missing user name.")
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
    
  // 1. validate args (throw if no name)
  // 2. check if user exists with getUserByName → throw if yes
  // 3. await createUser(name)
  // 4. setUser(name)
  // 5. console.log success message + the user data
