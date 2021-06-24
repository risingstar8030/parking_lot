const Parking = require("../Parking");

describe("Test for parking system", () => {
  describe("Create parking", () => {
    const parking = new Parking();

    it("Should create parking space", () => {
      let slots = 6;
      const response = parking.createParking(slots);
      expect(response).toEqual("Created parking of 6 slots");
    });

    it("Should throw error when parking slots input is less than 1", () => {
      let slots = 0,
        err;
      try {
        const response = parking.createParking(slots);
      } catch (error) {
        err = error;
      }
      expect(err).toBeDefined();
      expect(err.message).toEqual("Atleast 1 slot is needed");
    });
  });

  describe("When car is parked", () => {
    const parking = new Parking();
    parking.createParking(6);

    it("Should park car with regNo and driver age noted", () => {
      let regNo = "KA-01-HH-1234",
        driverAge = 21;
      const response = parking.park(regNo, driverAge);
      expect(response).toEqual(
        'Car with vehicle registration number "KA-01-HH-1234" has been parked at slot number 1'
      );
    });

    it("Should return slot number of parked car", () => {
      let regNo = "KA-01-HH-1234";
      const response = parking.slotNoOfCar(regNo);
      expect(response).toEqual(1);
    });

    it("Should return slot number of parked car using driver age", () => {
      let driverAge = 21;
      const response = parking.slotNoOfCarsUsingDriverAge(driverAge);
      expect(response).toEqual("1");
    });

    it("Should return regNo using driver age", () => {
      let driverAge = 21;
      const response = parking.vehicleRegistrationNoUsingDriverAge(driverAge);
      expect(response).toEqual("KA-01-HH-1234");
    });

    it("Should throw error when car of particular driver age not found", () => {
      let driverAge = 18,
        err;
      try {
        const response = parking.vehicleRegistrationNoUsingDriverAge(driverAge);
      } catch (error) {
        err = error;
      }
      expect(err).toBeDefined();
      expect(err.message).toEqual(
        "Driver age 18 : Cars Not Found which satisfies this condition"
      );
    });
  });
});
