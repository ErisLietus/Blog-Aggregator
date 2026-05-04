import { HandlerAgg } from "./commands/aggregate";
import { CommandsRegistry, registerCommand, runCommand } from "./commands/commands";
import { resetCommand } from "./commands/reset";
import { handlerGetUsers, handlerLogin, handlerRegister} from "./commands/user";

async function  main() {
  const commandsRegistry: CommandsRegistry = {};
  registerCommand(commandsRegistry,"login",handlerLogin)
  registerCommand(commandsRegistry, "register", handlerRegister);
  registerCommand(commandsRegistry, "reset", resetCommand);
  registerCommand(commandsRegistry, "users", handlerGetUsers)
  registerCommand(commandsRegistry, "agg", HandlerAgg)
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