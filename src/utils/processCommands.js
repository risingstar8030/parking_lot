const { Commands } = require("../enums/types");
const { getCommand, getCommandData, getDriverAge } = require("./processInput");
const Parking = require("../modules/Parking");

const parking = new Parking();

const processCommands = (input) => {
  const command = getCommand(input);
  const commandData = getCommandData(input);
  let response;

  try {
    switch (command) {
      case Commands.CREATE_PARKING_SLOT:
        response = parking.createParking(parseInt(commandData));
        break;
      case Commands.PARK:
        response = parking.park(commandData, parseInt(getDriverAge(input)));
        break;
      case Commands.LEAVE:
        response = parking.leave(parseInt(commandData));
        break;
      case Commands.SLOT_NUMBER_FOR_CAR_WITH_NUMBER:
        response = parking.slotNoOfCar(commandData);
        break;
      case Commands.SLOT_NUMBERS_FOR_DRIVER_OF_AGE:
        response = parking.slotNoOfCarsUsingDriverAge(parseInt(commandData));
        break;
      case Commands.VEHICLE_REGISTRATION_NUMBER_FOR_DRIVER_OF_AGE:
        response = parking.vehicleRegistrationNoUsingDriverAge(
          parseInt(commandData)
        );
        break;
      default:
        response = "INVALID COMMAND";
        break;
    }
    console.log(response);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = processCommands;
