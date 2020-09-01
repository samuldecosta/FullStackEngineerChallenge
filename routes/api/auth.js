const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Employee = require("../../models/Employees");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

//@route  GET api/auth
//@desc   Get Employee Data
//@access Public

router.get("/", auth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.employee.id).select(
      "-password"
    );
    return res.json(employee);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
});

//@route  POST api/auth
//@desc   Authenticate Employee and get token
//@access Public

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      body: { email, password },
    } = req;
    try {
      //see if Employee exist
      let employee = await Employee.findOne({ email });
      if (!employee) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatched = await bcrypt.compare(password, employee.password);
      if (!isMatched) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Incorrect Password" }] });
      }
      const payLoad = {
        employee: {
          id: employee.id,
        },
      };
      const employeeData = await await Employee.findOne({ email }).select(
        "-password"
      );
      //Send JWT Token
      jwt.sign(
        payLoad,
        config.get("jwtSecret"),
        { expiresIn: config.get("tokenExpireTime") },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.send({ token, employee: employeeData });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
