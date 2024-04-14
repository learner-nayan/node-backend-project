// require('dotenv').config({path: '../.env'})
import dotenv from "dotenv"
dotenv.config({path: '../.env'})

// import express from "express"
import mongoose from "mongoose"
import {DB_NAME} from "./constants.js"
import connectDB from "./db/index.js"
import { app } from "./app.js"
// const app = express()

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
    console.log("Server error: ",err.message);
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