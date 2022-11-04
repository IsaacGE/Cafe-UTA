const mongoose = require("mongoose")
const { Schema } = mongoose

const SalesSchema = new Schema(
  {
    productsList: {
      type: Array,
      required: [true, "Pruducts list is required"]
    },
    totalSale: {
      type: Number,
      required: [true, "Total sale is required"]
    },
    saleEmployee: {
      ref: 'User',
      type: Schema.Types.ObjectId
    },
    buyerUser: {
      ref: 'User',
      type: Schema.Types.ObjectId
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


module.exports = mongoose.model("Sales", SalesSchema);
