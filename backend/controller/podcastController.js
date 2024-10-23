import Category from "../models/category.js";
import Podcast from "../models/podcasts.js";
import User from "../models/user.js";

export const addPodcast = async (req, res) => {
    try {
        const { title, description, category } = req.body;

        // Check if files are present
        if (!req.files || !req.files["frontImage"] || !req.files["audioFile"]) {
            return res.status(400).json({ msg: "Please upload front image and audio file" });
        }

        const frontImage = req.files["frontImage"][0]?.path;
        const audioFile = req.files["audioFile"][0]?.path;

        // Check for missing fields
        if (!frontImage || !audioFile || !category || !title || !description) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        const { user } = req;  // Make sure user is attached to req
        if (!user) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        // Check if the category exists
        const cat = await Category.findOne({ categoryName: category });
        if (!cat) {
            return res.status(400).json({ msg: "Invalid category" });
        }

        const catid = cat._id;
        const userid = user._id;

        // Create new podcast
        const newPodcast = new Podcast({
            title,
            description,
            frontImage,
            audioFile,
            user: userid,
            category: catid
        });

        await newPodcast.save();

        // Update Category and User with new podcast
        await Category.findByIdAndUpdate(catid, {
            $push: { podcasts: newPodcast._id }
        });
        await User.findByIdAndUpdate(userid, {
            $push: { podcasts: newPodcast._id }
        });

        res.status(201).json({ msg: "Podcast created successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

export const getPodcasts = async (req, res) => {
    try {
        const podcasts = await Podcast.find()
        .populate("category")
        .sort({createdAt:-1})
        return res.status(200).json({data: podcasts})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server error"})

    }
}

export const userPodcasts = async (req, res) => {
    try {
        const {user} = req
        const userid = user._id;
        const data = await User.findById(userid)
        .populate({
            path:"podcasts",
            populate:{path:"category"}
        })
        .select("-password");
    
        if (data && data.podcasts){
            data.podcasts.sort(
                (a,b)=> new Date(b.createdAt) - new Date(a.createdAt)
            )
        }
        return res.status(200).json({data:data.podcasts})
    } catch (error) {
        return res.status(500).json({msg:"internal server error"})
    }
}

export const getPodcastById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Fetch the podcast from the database
        const podcasts = await Podcast.findById(id).populate("category");
        
        // If no podcast is found, return a 404 response
        if (!podcasts) {
            return res.status(404).json({ msg: "Podcast not found" });
        }

        // Return the actual podcast data
        return res.status(200).json({ data: podcasts });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server error" });
    }
};


export const getPodcastCat = async (req, res) => {
    try {
        const { cat } = req.params;  // Get the category from URL params
        const categories = await Category.find({ categoryName: cat }).populate({
            path: "podcasts",
            populate: { path: "category" }
        });

        if (!categories || categories.length === 0) {
            return res.status(404).json({ msg: "Category not found" });
        }

        let podcasts = [];
        categories.forEach((category) => {
            podcasts = [...podcasts, ...category.podcasts];
        });

        return res.status(200).json({ data: podcasts });
    } catch (error) {
        console.error("Error in getPodcastCat:", error);  // Log the error details
        return res.status(500).json({ msg: "Server error", error: error.message });
    }
};
