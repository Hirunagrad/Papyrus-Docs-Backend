const express = require("express");
const router = express.Router();
let RoleTemplate = require("../models/roleTemplates");
const jwt = require("jsonwebtoken");

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

router.post("/createTemplate" , async (req, res) => {
  let { role, template_name } = req.body;
  //let user = new User(userData);

  // RoleTemplate.create(userData, (error, registerUser) => {
  //     //res.status(200).send(registerUser);
  //     let payload = { subject: registerUser._id };
  //     let token = jwt.sign(payload, "secretKey");

  //   });

  RoleTemplate.create({ role, template_name }, (error, templates) => {
    if (error) {
      console.log(error);
    }
    res.status(200).send(templates);
  });
});

router.delete("/deleteTemplate/:id", async (req, res) => {
  try {
    const deletedMytemplate = await RoleTemplate.findByIdAndDelete(
      req.params.id
    );
    res
      .status(200)
      .json({ data: deletedMytemplate, message: "successfully deleted" });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});



module.exports = router;
