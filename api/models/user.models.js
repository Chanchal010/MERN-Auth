import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"
    }
}, {
    timestamps: true
});
const User = mongoose.model("User", userSchema);

export default User;