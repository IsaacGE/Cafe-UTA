const mongoose = require("mongoose")
const { Schema } = mongoose

const SalesSchema = new Schema(
  {
    productsList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Products'
      }
    ],
    totalSale: {
      type: Number,
      required: [true, "Total sale is required"]
    },
    sale:{
      type: Boolean,
      default: false
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
