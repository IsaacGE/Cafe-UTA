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
        matricula: {
            type: String,
            required: [true, "Matricula is required"]
        },
        password: { 
            type: String, 
            required: [true, "Password is required"] 
        },
        active: {
            type: Boolean,
            default: true
        },
        
        role: { 
            ref: 'Roles',
            type: Schema.Types.ObjectId
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
