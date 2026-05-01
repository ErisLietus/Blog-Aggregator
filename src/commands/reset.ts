import { deleteUsers } from "src/lib/db/queries/users";

export async function resetCommand(){
    await deleteUsers();
    console.log("users deleted")

}