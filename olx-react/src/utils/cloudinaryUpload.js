import axios from "axios";

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "lo6mhlpx"); // Create it in Cloudinary
  formData.append("cloud_name", "ddguo12aw");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/ddguo12aw/image/upload",
      formData
    );
    return response.data.secure_url; // This is the image URL
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
};
//674195747259267 // API key
// oQOG3YCucuFNsqTfd9_L8_hHJaA //API secret