import { handlerAgg } from "./commands/aggregate";
import { CommandsRegistry, registerCommand, runCommand } from "./commands/commands";
import { followCommand, followingCommand } from "./commands/feed-follows";
import { resetCommand } from "./commands/reset";
import { handlerGetUsers, handlerLogin, handlerRegister} from "./commands/user";
import { handlerAddFeed, handlerListFeeds } from "./lib/db/queries/feeds";

async function  main() {
  const commandsRegistry: CommandsRegistry = {};
  registerCommand(commandsRegistry,"login",handlerLogin)
  registerCommand(commandsRegistry, "register", handlerRegister);
  registerCommand(commandsRegistry, "reset", resetCommand);
  registerCommand(commandsRegistry, "users", handlerGetUsers)
  registerCommand(commandsRegistry, "agg", handlerAgg)
  registerCommand(commandsRegistry, "addfeed", handlerAddFeed)
  registerCommand(commandsRegistry, "feeds", handlerListFeeds)
  registerCommand(commandsRegistry, "follow", followCommand)
  registerCommand(commandsRegistry, "following", followingCommand)
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