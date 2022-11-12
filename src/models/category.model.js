const mongoose = require("mongoose")
const { Schema } = mongoose

const caregorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        active: {
            type: Boolean,
            default: true
        },
        idProducts: [{ type: Schema.Types.ObjectId, ref: 'products' }]
    },
    {
        versionKey: false,
        timestamps: true,
    }
);


module.exports = mongoose.model("Categories", caregorySchema);
