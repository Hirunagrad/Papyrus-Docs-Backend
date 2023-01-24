const mongoose = require("mongoose");

const employmentApplicationSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required:false
    },

    last_name: {
      type: String,
    },

    email: {
      type: String,
    },

    address: {
      type: String,
    },

    city: {
      type: String,
    },

    zip_code: {
      type: Number,
    },

    state: {
      type: String,
    },

    gender: {
      type: String,
    },

    phone_number: {
      type: Number,
    },
    city: {
      type: Number,
    },
  },
  {
    collection: "roletemplate",
  }
);

const EmploymentApplication = mongoose.model(
  "employmentApplicationSchema",
  employmentApplicationSchema
);
module.exports = EmploymentApplication;
