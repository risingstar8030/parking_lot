const Car = require("./Car");
const { isNull, isEqual, isEmpty } = require("lodash");
const ERROR = require("../enums/errors");

class Parking {
  noOfAvailableSlots = 0;
  noOfParkingSlots = 0;
  parkingSlots = [];

  createParking = (noOfParkingSlots) => {
    this.noOfParkingSlots = noOfParkingSlots;
    this.noOfAvailableSlots = noOfParkingSlots;
    if (this.noOfParkingSlots < 1) throw new Error(ERROR.NO_SLOTS);
    this.parkingSlots = new Array(this.noOfParkingSlots).fill(null);
    return `Created parking of ${this.noOfParkingSlots} slots`;
  };

  park = (regNo, driverAge) => {
    if (this.noOfParkingSlots < 1) throw new Error(ERROR.NO_SLOTS);
    if (this.noOfAvailableSlots < 1) throw new Error(ERROR.PARKING_FULL);
    this.noOfAvailableSlots--;
    const freeSlot = this.getAvailableParkingSlot();
    const car = new Car(regNo, driverAge);
    this.parkingSlots[freeSlot] = car;
    return `Car with vehicle registration number "${regNo}" has been parked at slot number ${
      freeSlot + 1
    }`;
  };

  leave = (slotNo) => {
    if (this.noOfParkingSlots < 1) throw new Error(ERROR.NO_SLOTS);
    if (slotNo > this.noOfParkingSlots || slotNo < 1)
      throw new Error(`${slotNo} : ${ERROR.SLOT_NOT_FOUND}`);
    slotNo--;
    if (isNull(this.parkingSlots[slotNo]))
      throw new Error(`${slotNo + 1} : ${ERROR.EMPTY_SLOT}`);
    const { registrationNo, age } = this.parkingSlots[slotNo];
    this.parkingSlots[slotNo] = null;
    this.noOfAvailableSlots++;
    return `Slot number ${
      slotNo + 1
    } vacated, the car with vehicle registration number "${registrationNo}" left the space, the driver of the car was of age ${age}`;
  };

  getAvailableParkingSlot = () => {
    for (const [index, value] of this.parkingSlots.entries()) {
      if (isNull(value)) return index;
    }
  };

  slotNoOfCar = (regNo) => {
    if (this.noOfParkingSlots < 1) throw new Error(ERROR.NO_SLOTS);
    let slot = -1;
    for (const [index, car] of this.parkingSlots.entries()) {
      if (!isNull(car) && isEqual(car.getRegistrationNo, regNo)) {
        slot = index + 1;
        break;
      }
    }
    if (slot === -1) throw new Error(`Registration No ${regNo} : ${ERROR.NOT_FOUND}`);
    return slot;
  };

  slotNoOfCarsUsingDriverAge = (driverAge) => {
    if (this.noOfParkingSlots < 1) throw new Error(ERROR.NO_SLOTS);
    let slots = [];
    for (const [index, car] of this.parkingSlots.entries()) {
      if (!isNull(car) && isEqual(car.getDriverAge, driverAge)) {
        slots.push(index + 1);
      }
    }
    if (isEmpty(slots))
      throw new Error(`Driver age ${driverAge} : ${ERROR.NOT_FOUND}`);
    return slots.join(", ");
  };

  vehicleRegistrationNoUsingDriverAge = (driverAge) => {
    if (this.noOfParkingSlots < 1) throw new Error(ERROR.NO_SLOTS);
    let vehicleRegistrationNo = [];
    for (const [index, car] of this.parkingSlots.entries()) {
      if (!isNull(car) && isEqual(car.getDriverAge, driverAge)) {
        vehicleRegistrationNo.push(car.getRegistrationNo);
      }
    }
    if (isEmpty(vehicleRegistrationNo))
      throw new Error(`Driver age ${driverAge} : ${ERROR.NOT_FOUND}`);
    return vehicleRegistrationNo.join(", ");
  };
}

module.exports = Parking;
