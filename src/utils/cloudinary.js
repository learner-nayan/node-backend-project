import {v2 as cloudinary} from 'cloudinary'
import fs from "fs"

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: CLOUDINARY_CLOUD_NAME, 
  api_key: CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_API_SECRET 
})


const uploadOnCloudinary = async (localFilepath)=>{
    try {
        if(!localFilepath) return null
        const response = await cloudinary.uploader.upload(filepath, {
            resource_type: "auto"
        })
        console.log("File uploaded successfully! ", response.url);
        return response
    } catch (error) {
        fs.unlinkSync(localFilepath)
        return null
    }
}

export {uploadOnCloudinary}
