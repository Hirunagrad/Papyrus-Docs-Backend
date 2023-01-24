const express = require("express");
const router = express.Router();
let RoleTemplate = require("../models/roleTemplates");
const jwt = require("jsonwebtoken");
const EmploymentApplication = require("../models/HR/employmentApplcation");

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("Unauthorized request");
  }
  let payload = jwt.verify(token, "secretKey");
  if (!payload) {
    return res.status(401).send("Unauthorized request");
  }
  req.userId = payload.subject;
  next();
}

//employee application
router.post("/saveemployeeapplcation", async (req, res, next) => {
  let {
    first_name,
    last_name,
    email,
    address,
    city,
    zip_code,
    state,
    gender,
    phone_number,
  } = req.body;

  const newTemplate = new EmploymentApplication({
    first_name,
    last_name,
    email,
    address,
    city,
    zip_code,
    state,
    gender,
    phone_number,
  });

  try {
    const template = await newTemplate.save((err, registerTemplate) => {
      if (registerTemplate) {
        res.status(201).json({
          data: registerTemplate,
          message: "Job Application Create Succesfully",
        });
      }
    });
  } catch (error) {
    next(cerateError(500, error));
  }
});

router.get("/getEmployeeApplcation", async (req, res, next) => {
  try {
    const emplaoyeeData = await EmploymentApplication.find();
    res.status(200).json(emplaoyeeData);
  } catch (error) {
    next(cerateError(500, error));
  }
});

router.get("/getEmployeeApplcationData/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const emplaoyeeDataByid = await EmploymentApplication.findById(id);
    res.json(emplaoyeeDataByid);
  } catch (error) {
    next(cerateError(500, error));
  }
});

router.patch("/updateTemplate/:id", async (req, res) => {
  console.log("body", req.body);
  console.log("params", req.params.id);

  try {
    const updatedMytrips = await EmploymentApplication.updateOne(
      { _id: req.params.id },
      {
        $set: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          address: req.body.address,
          zip_code: req.body.zip_code,
          state: req.body.state,
          gender: req.body.gender,
          phone_number: req.body.phone_number,
          city: req.body.city
        },
      }
    );

    res.json({ data: updatedMytrips, message: "updated Successfull" });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = router;
