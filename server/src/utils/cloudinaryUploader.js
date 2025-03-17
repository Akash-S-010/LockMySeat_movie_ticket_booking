import cloudinary from "../config/cloudinary.js"; 

const cloudinaryUpload = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath);
        return result.secure_url;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new Error("Image upload failed");
    }
};

export default cloudinaryUpload;