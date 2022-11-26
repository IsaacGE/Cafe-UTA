
const mongoose = require("mongoose")
const { Schema } = mongoose

const historySalesSchema = new Schema(
  {
    productsList: [
        {type: String,
        ref: 'Products'}
    ],
    totalSale: {
      type: Number,
    },
    sale:{
      type: Boolean,
      default: false
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


module.exports = mongoose.model("historySales", historySalesSchema);
