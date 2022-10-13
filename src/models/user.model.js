const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema(
    {
        completeName: { 
            type: String, 
            required: [true, "Name is required"] 
        },
        imageUrl: { 
            type: String 
        },
        email: { 
            type: String, 
            required: [true, "Email is required"] 
        },
        password: { 
            type: String, 
            required: [true, "Password is required"] 
        },
        role: { 
            type: String,
            default: "client"
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
