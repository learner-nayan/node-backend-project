import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from "../models/users.model.js"
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import fs from "fs"

const registerUser = asyncHandler(async (req, res)=> {
    //take username, email, fullName, avatar, coverImage, password
    // validate the data; email uniqueness, password strenth, (coverImage optional)
    //check if the email already exists in users table 
    //uplaod to cloudinary
    //if email is unique, then create an object and post the data to database
    //remove password and refresh token field from response
    //check for user creation
    //return response
    const {email, username, fullName, password} = req.body
    if([username, email, fullName, password].some((field) => field?.trim()===undefined)){
        throw new ApiError(400, "All fields are required")
    }

    const userExists = await User.findOne({
        $or: [{email}, {username}]
    })
    
    if(userExists){
        throw new ApiError(409, "User already exists!")
    }

    const avatarLocalFile = req.files?.avatar?.[0]?.path
    const coverImageLocalFile = req.files?.coverImage?.[0]?.path

    if(!avatarLocalFile){
        throw new ApiError(400, "Avatar is required!")
    }

    const avatar = await uploadOnCloudinary(avatarLocalFile)
    const coverImage = await uploadOnCloudinary(coverImageLocalFile)

    fs.unlinkSync(avatarLocalFile)
    if(coverImageLocalFile){
        fs.unlinkSync(coverImageLocalFile)
    }

    if(!avatar){
        throw new ApiError(400, "Avatar is required")
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        fullName,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -watchHistory"
    )

    if(!createdUser){
        throw new ApiError(400, "Something went wrong during registration!")
    }


    res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully!")
    )

})  

export {registerUser}