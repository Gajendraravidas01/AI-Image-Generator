import {Post} from '../model/post.js';
import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET_KEY,
  });

const getallpost = async (req,res) => {
    try {
        const posts = await Post.find({});
        return res.status(200).json({message: 'all post fetched successfully',data: posts});
    } catch (error) {
        return res.send(500).json({message: 'error in getting all post',error});
    }
}

const createnewpost = async (req,res) => {
    try {
        const {name,prompt,photo} = req.body;
        const photourl = await cloudinary.uploader.upload(photo);
        const newpost = new Post({
            name,
            prompt,
            photo: photourl.secure_url
        })
        await newpost.save();
        return res.status(200).json({message: 'new post created successfully',data : newpost});
    } catch (error) {
        return res.status(500).json({message: 'errorin creating a post',error});
    }
}

export {getallpost,createnewpost};