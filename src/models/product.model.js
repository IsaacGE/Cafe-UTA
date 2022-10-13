const mongoose = require("mongoose")
const { Schema } = mongoose

const productSchema = new Schema(
    {
        name: { 
            type: String, 
            required: [true, "Name is required"] 
        },
        description: {
            type: String,
        },
        imageUrl: { 
            type: String 
        },
        price: { 
            type: Number, 
            required: [true, "Price is required"] 
        },
        stock: { 
            type: Number, 
            required: [true, "Stock is required"] 
        },
        active: {
            type: Boolean,
            default: true
        },
        category: {
            ref: 'Category',
            type: Schema.Types.ObjectId
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);


module.exports = mongoose.model("Product", productSchema);
