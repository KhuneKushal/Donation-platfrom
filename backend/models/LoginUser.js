import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define the Login schema
const loginUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: true,
    },
});

// Method to compare the entered password with the hashed password
loginUserSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

// Create and export the LoginUser model
const LoginUser = mongoose.model("LoginUser", loginUserSchema);

export default LoginUser;
