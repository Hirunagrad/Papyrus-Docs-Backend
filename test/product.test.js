const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../server");
const Role = require("../models/roleTemplates");

chai.use(chaiHttp);

describe("Template API", () => {
  before((done) => {
    Role.deleteMany({}, function (err) {});
    done();
  });

  it("Post All Faculties", (done) => {
    chai
      .request(server)
      .get("/hrtemplate/getEmployeeApplcation")
      .end((err, res) => {
        res.should.have.status(200);
      }),
      done();
  });

  it("GET All Faculties", (done) => {
    chai
      .request(server)
      .post("/hrtemplate/saveemployeeapplcation")
      .end((err, res) => {
        res.should.have.status(201);
      }),
      done();
  });

  it("Update All Faculties", (done) => {
    chai
      .request(server)
      .patch("/hrtemplate/updateTemplate/1")
      .end((err, res) => {
        res.should.have.status(200);
      }),
      done();
  });

  it("get employee apllication data by id", (done) => {
    chai
      .request(server)
      .get("/hrtemplate/getEmployeeApplcationData/1")
      .end((err, res) => {
        res.should.have.status(200);
      }),
      done();
  });
});

describe("Role API", () => {
  it("Delete Role By ID", (done) => {
    chai
      .request(server)
      .delete("/template/deleteTemplate/1")
      .end((err, res) => {
        res.should.have.status(200);
      }),
      done();
  });

  it("Create Template", (done) => {
    chai
      .request(server)
      .post("/template/createTemplate")
      .end((err, res) => {
        res.should.have.status(200);
      }),
      done();
  });

  after((done) => {
    Role.deleteMany({}, function (err) {});
    done();
  });
});

describe("Authenication", () => {
  let user = {
    email: "mark1@petersen.com",
    password: "123456",
  };

//   it("user register", (done) => {
//     chai
//       .request(server)
//       .post("/api/register")
//       .send(user)
//       .end((err, res) => {
//         res.should.have.status(200);
//       }),
//       done();
//   });

  it("user login", (done) => {
    chai
      .request(server)
      .post("/api/login")
      .end((err, res) => {
        res.should.have.status(200);
      }),
      done();
  });
});

// var assert = require("assert");
// describe("Array", function () {
//   describe("#indexOf()", function () {
//     it("should return -1 when the value is not present", function () {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });
