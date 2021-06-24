const fs = require("fs");
const processCommands = require("./processCommands");
const commandLineInputs = process.argv;

const readCommandsFile = () => {
  if (commandLineInputs[commandLineInputs.length - 1].endsWith(".txt")) {
    fs.readFile(commandLineInputs[2], "utf-8", (err, data) => {
      if (err) {
        console.log("Reading Failed");
        return;
      }
      const commands = data.split("\n");
      for (let cmd of commands) processCommands(cmd);

      process.exit(1);
    });
  } else {
    console.log("Something went wrong");
  }
};

module.exports = readCommandsFile;
