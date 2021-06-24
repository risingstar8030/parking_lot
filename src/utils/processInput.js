const getCommand = (input) => input.split(" ")[0];

const getDriverAge = (input) => input.split(" ")[3];

const getCommandData = (input) => input.split(" ")[1];

module.exports = {
  getCommand,
  getDriverAge,
  getCommandData,
};
