const mongoose = require("mongoose");
const coustmeruser = require("../Model/CoustomerModel");
const carduser=require("../Model/CardModel")

const isValidBody = (value) => {
  if (typeof value === "undefined" || typeof value === "null") return false;
  if (typeof value === "string" && value.trim().length == 0) return false;
  return true;
};

const isValidData = (value) => {
  return Object.keys(value).length > 0;
};
const isValidObjectId = (value) => {
  return mongoose.isValidObjectId(value);
};

const isValidName = (value) => {
  return /^[A-Z a-z]+$/.test(value);
};
const isValidEmail = (value) => {
  return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/.test(
    value
  );
};
const isValidMobileNumber = (value) => {
  return /^[6789][0-9]{9}$/g.test(value);
};
const isValidDate = (value) => {
  return /^\d{4}[\-\/\s]?((((0[13578])|(1[02]))[\-\/\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\-\/\s]?(([0-2][0-9])|(30)))|(02[\-\/\s]?[0-2][0-9]))$/.test(
    value
  );
};
const isValidateStatus = (value) => {
  return ["ACTIVE", "INACTIVE"].indexOf(value) !== -1;
};
const isValidateCardType = (value) => {
  return ["REGULAR", "SPECIAL"].indexOf(value) !== -1;
};



module.exports = {
  vcreateUser: async (req, res, next) => {
    try {
      const data = req.body;
      const { firstName, lastName, mobileNumber, DOB, emailID, address, } = data;

      if (
        !firstName ||
        !lastName ||
        !mobileNumber ||
        !DOB ||
        !emailID ||
        !address
      )
        return res
          .status(400)
          .send({
            status: false,
            message: `All fields are mandatory (e.g. firstName, lastName, mobileNumber, DOB, emailID, address and status) !`,
          });

      if (!isValidName(firstName))
        return res
          .status(400)
          .send({
            status: false,
            message: `This First Name: '${firstName}' is not valid!`,
          });
      if (!isValidName(lastName))
        return res
          .status(400)
          .send({
            status: false,
            message: `This Last Name: '${lastName}' is not valid!`,
          });

      if (!isValidDate(DOB))
        return res
          .status(400)
          .send({
            status: false,
            message: `This DOB date: '${DOB}' is not valid (e.g. format should be "YYYY/MM/DD")!`,
          });

      if (!isValidEmail(emailID))
        return res
          .status(400)
          .send({
            status: false,
            message: `This EmailID: '${emailID}' is not valid!`,
          });

      const uniqueCheck = await coustmeruser.findOne({
        $or: [{ emailID: emailID }, { mobileNumber: mobileNumber }],
      });
      if (uniqueCheck) {
        if (uniqueCheck.mobileNumber == mobileNumber)
          return res
            .status(400)
            .send({
              status: false,
              message: `This Mobile No.: '${mobileNumber}' is already used!`,
            });
        if (uniqueCheck.emailID == emailID)
          return res
            .status(400)
            .send({
              status: false,
              message: `This EmailID: '${emailID}' is already used!`,
            });
      }

      if (!isValidName(address))
        return res
          .status(400)
          .send({
            status: false,
            message: `This Address: '${address}' is not valid!`,
          });



      return next();
    } catch (e) {
      res.status(500).send({ status: false, error: e.message });
    }
  },




  vdeletecoustmor: async (req, res, next) => {
    try {
      if (req.params.userId) {
        if (!isValidObjectId(req.params.userId)) {
          return res
            .status(400)
            .send({ status: false, message: "UserId is not Valid" });
        }
      }
    return  next();
    } catch (e) {
      res.status(500).send({ status: false, error: e.message });
    }
  },





  vcreateCarduser : async (req, res,next) => {

    try {

        const data = req.body
        const { cardType, customerName, status, vision, } = data


        if (!isValidateCardType(cardType)) return res.status(400).send({ status: false, message: `This Card Type: '${cardType}' is not valid (e.g. you have two options 'REGULAR' or 'SPECIAL') !` })

        if (!isValidName(customerName)) return res.status(400).send({ status: false, message: `This Customer Name: '${customerName}' is not valid!` })

        if (status && !isValidateStatus(status)) return res.status(400).send({ status: false, message: `This Status: '${status}' is not valid (e.g. you have two options 'ACTIVE' or 'INACTIVE') !` })

        if (!isValidName(vision)) return res.status(400).send({ status: false, message: `This Vision: '${vision}' is not valid format!` })

        if (!isValidObjectId(customerID)) return res.status(400).send({ status: false, message: `This CustomerID: '${customerID}' is not valid!` })


        const checkCustomerID = await carduser.findOne({ customerID: customerID,status:"ACTIVE" })
        if (!checkCustomerID) return res.status(404).send({ status: false, message: `This CustomerID: '${customerID}' is not exist! ` })
return next()

    } catch (e) {
      res.status(500).send({ status: false, error: e.message });
    }
  }

};
