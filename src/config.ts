
import fs from "fs";
import os from "os";
import path from "path";

type Config = {
  dbUrl: string;
  currentUserName: string;
};

function getConfigFilePath(): string {
  return path.join(os.homedir(), ".gatorconfig.json");
}

  function writeConfig(config: Config): void {
  const rawConfig = {
    db_url: config.dbUrl,
    current_user_name: config.currentUserName,
  };
  fs.writeFileSync(getConfigFilePath(), JSON.stringify(rawConfig));
}

export function setUser(userName: string) {
  const config = readConfig();
  config.currentUserName = userName;
  writeConfig(config);
}

export function readConfig() {
  const jsonFile = fs.readFileSync(getConfigFilePath(), "utf-8");
  const rawConfig = JSON.parse(jsonFile);
  return validateConfig(rawConfig);
}

function validateConfig(rawConfig: any): Config {
  if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
    throw new Error("invalid config: missing db_url");
  }
  const currentUserName = rawConfig.current_user_name || "";
  return {
    dbUrl: rawConfig.db_url,
    currentUserName: currentUserName,
  };


}