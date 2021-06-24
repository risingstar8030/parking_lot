const Driver = require("./Driver");

class Car extends Driver {
  constructor(registrationNo, driverAge) {
    super(driverAge);
    this.registrationNo = registrationNo;
  }

  get getRegistrationNo() {
    return this.registrationNo;
  }
}

module.exports = Car;
