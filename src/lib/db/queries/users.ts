import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUserByName(name: string): Promise<typeof users.$inferSelect | undefined> {
  const [result] = await db.select().from(users).where(eq(users.name, name));
  return result;
}
export async function deleteUsers(){
await db.delete(users);
}
export async function getUsers(){
  return await db.select().from(users);
}


export async function getUserById(id: string) {
  const [user_id] = await db.select().from(users).where(eq(users.id, id))
  return user_id
 
}