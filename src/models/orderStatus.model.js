const mongoose = require("mongoose")
const { Schema } = mongoose

const SaleStatusSchema = new Schema(
  {
    key: {
      type: String,
      required: [true, "Sale status key is required"]
    },
    value: {
      type: String,
      required: [true, "Sale status value is required"]
    },
    description: {
      type: String,
      required: [true, 'Sale status description is required']
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


module.exports = mongoose.model("OrderStatus", SaleStatusSchema);
