import mongoose, {Schema} from "mongoose";

const authSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }   
}, {
    timestamps: true
});


export const User = mongoose.model("User", authSchema)