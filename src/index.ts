import { readConfig, setUser } from "./config";

function main() {
  setUser("boots")
  console.log(readConfig())
}

main();