import mongoose, {Schema} from "mongoose";

import { Video } from "./videos.model";

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName:{
        type: String,
        required: true,
        trim: true,
    },
    avatar:{
        type: String, //cloudinary
        required: true,
    },
    coverImage:{
        type: String, //cloudinary
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    refreshToken:{
        type: String,
        required: true,
        trim: true,
    },
    watchHistory:{
        type: mongoose.Types.ObjectId,
        ref: "Video"
    },
},{
    timestamps: true
})

export const User = mongoose.Model("User", userSchema)