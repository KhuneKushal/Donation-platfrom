import mongoose from "mongoose";
import bcrypt from "bcrypt";

const registerUserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required."],
            minlength: 3,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required."],
            unique: true,
            lowercase: true,
            match: [/.+@.+\..+/, "Please provide a valid email address."],
        },
        password: {
            type: String,
            required: [true, "Password is required."],
            minlength: 6,
        },
        phoneno: {
            type: String,
            required: [true, "Phone number is required."],
            match: [/^\d{10}$/, "Please provide a valid 10-digit phone number."],
        },
    },
    { timestamps: true }
);

// Hash password before saving
registerUserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const RegisterUser = mongoose.model("RegisterUser", registerUserSchema);

export default RegisterUser;
