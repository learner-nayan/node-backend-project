import mongoose, {Schema} from "mongoose";

import { Video } from "./videos.model";

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

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

userSchema.pre("save", function(next){
    if(!this.isModified("password")) return next()
    this.password = bcrypt(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.Model("User", userSchema)