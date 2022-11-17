const mongoose = require("mongoose")
const { Schema } = mongoose

const RolesSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Rolen name is required"]
    },
    description: {
      type: String,
      required: [true, 'Role description is required']
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


module.exports = mongoose.model("Roles", RolesSchema);
