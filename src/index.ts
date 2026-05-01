import { CommandsRegistry, registerCommand, runCommand } from "./commands";
import { handlerLogin, handlerRegister} from "./user";

async function  main() {
  const commandsRegistry: CommandsRegistry = {};
  registerCommand(commandsRegistry,"login",handlerLogin)
  registerCommand(commandsRegistry, "register", handlerRegister);
  const args = process.argv.slice(2);
  if(args.length < 1) {
    console.log("Not enough arguments provided");
    process.exit(1);
  } else {
    try {
    const cmdName = args[0];
    const cmdArgs = args.slice(1);
    await runCommand(commandsRegistry, cmdName, ...cmdArgs)
    } catch (error) {
      if (error instanceof Error) {
      console.error(error.message);
}
      process.exit(1)
    }
    process.exit(0);
  } 
}



main();