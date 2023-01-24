const mongoose = require("mongoose");

const roletemplateSchema = mongoose.Schema(
  {
    role: {
      type: String,
    },

    template_name: {
      type: String,
    },
  },
  {
    collection: "roletemplate",
  }
);

const RoleTemplate = mongoose.model("roletemplateSchema", roletemplateSchema);
module.exports = RoleTemplate;
