import { CommandsRegistry, handlerLogin, registerCommand, runCommand } from "./commands";

function main() {
  const commandsRegistry: CommandsRegistry = {};
  registerCommand(commandsRegistry,"login",handlerLogin)
  const args = process.argv.slice(2);
  if(args.length < 1) {
    console.log("Not enough arguments provided");
    process.exit(1);
  } else {
    try {
    const cmdName = args[0];
    const cmdArgs = args.slice(1);
    runCommand(commandsRegistry, cmdName, ...cmdArgs)
    } catch (error) {
      if (error instanceof Error) {
      console.error(error.message);
}
      process.exit(1)
    }
    
  } 
}



main();