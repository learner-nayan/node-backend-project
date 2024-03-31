// require('dotenv').config({path: '../.env'})
import dotenv from "dotenv"
dotenv.config({path: '../.env'})

import mongoose from "mongoose"
import {DB_NAME} from "./constants.js"
import connectDB from "./db/index.js"

connectDB()
.then(() =>{
    app.on("error", (error)=>{
        console.log("Error: ",error)
        throw error
    })
    app.listen(process.env.PORT || 8080, ()=>{
        console.log(`Server running to port ${process.env.PORT}`);
    })
})
.catch((err) =>{
    console.log("DB connection error ",err);
})









/*
import express from "express"
const app = express()
;( async() =>{
    try {
        await mongoose.connect(`${[process.env.MONGODB_URI]}/${DB_NAME}`)
        app.on('error', ()=>{
            console.log("ERROR: ", error)
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`Server running at the port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("Error: ", error)
        throw error
    }
})()
*/