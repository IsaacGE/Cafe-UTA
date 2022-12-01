const mongoose = require("mongoose")
const { Schema } = mongoose

const SalesSchema = new Schema(
  {
    productList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    ],
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
    },
    saleStatus: {
      ref: 'OrderStatus',
      type: Schema.Types.ObjectId
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


module.exports = mongoose.model("Sales", SalesSchema);
