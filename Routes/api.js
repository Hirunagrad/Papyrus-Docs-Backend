const express = require("express");
const router = express.Router();
let User = require("../models/user");
const jwt = require("jsonwebtoken");

// router.get("/api", (req, res) => {
//   res.send("FromApi Routes");
// });

//route

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

router.post("/register", async (req, res) => {
  let userData = req.body;
  console.log("role",req.body);
  //let user = new User(userData);
  const userExist = await User.findOne({ email: userData.email });
  console.log(userExist);

  if (userExist) {
    res.status(401).json({message:"user already exists"});
  } else {
    User.create(userData, (error, registerUser) => {
      //res.status(200).send(registerUser);
      let payload = { subject: registerUser._id };
      let token = jwt.sign(payload, "secretKey");
      res.status(200).json({ token:token,message:"user register successfully"});
    });

    // user.save((error,registerdUser)=>{
    //   res.status(200).send(registerdUser);

    // })
  }
});

router.post("/login", (req, res) => {
  let userData = req.body;
  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send("Invalid Email");
      } else if (user.password !== userData.password) {
        res.status(401).send("Invalid Password");
      } else {
        let payload = { subject: user._id };
        let token = jwt.sign(payload, "secretKey");
        res.status(200).send({ token:token,data:user });
      }
    }
  });
});

router.get("/events", (req, res) => {
  let events = [
    {
      _id: "1",
      name: "Auto Expo",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
    {
      _id: "2",
      name: "Auto Expo",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
    {
      _id: "3",
      name: "Auto Expo",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
    {
      _id: "4",
      name: "Auto Expo",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
    {
      _id: "5",
      name: "Auto Expo",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
    {
      _id: "6",
      name: "Auto Expo",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
  ];
  res.json(events);
});

router.get("/special", verifyToken, (req, res) => {
  let specialEvents = [
    {
      _id: "1",
      name: "Auto Expo Special",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
    {
      _id: "2",
      name: "Auto Expo Special",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
    {
      _id: "3",
      name: "Auto Expo Special",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
    {
      _id: "4",
      name: "Auto Expo Special",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
    {
      _id: "5",
      name: "Auto Expo Special",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
    {
      _id: "6",
      name: "Auto Expo Special",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
  ];
  res.json(specialEvents);
});

module.exports = router;
