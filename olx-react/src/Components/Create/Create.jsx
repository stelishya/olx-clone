import React, {useContext, useEffect, useState } from "react";
import "./Create.css";
import { AuthContext } from "../../context/firebaseContext";
import axios from "axios";
import { db } from "../../firebase/config";
import {useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

const Create = () => {

  const userContext = useContext(AuthContext);
  const [productData, setProductData] = useState({
    Name: "",
    category: "",
    Price: "",
    user: "",
  });

  const [productImage, setProductImage] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (userContext?.user.uid) {
      setProductData((p) => ({ ...p, user: userContext.user.uid }));
    }
  }, []);

  function HandleProduct(e) {
    setProductData((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleImage(e) {
    setProductImage(e.target.files[0]);
  }
  
  const validateForm = () => {
    const newErrors = {};

    if (!productData.Name || productData.Name.length < 3) {
      newErrors.Name = "Name must be at least 3 characters.";
    }

    if (!productData.category || productData.category.length < 3) {
      newErrors.category = "Category must be at least 3 characters.";
    }

    if (!productData.Price || Number(productData.Price) <= 0) {
      newErrors.Price = "Price must be a positive number.";
    }

    if (!productImage) {
      newErrors.Image = "Please upload a product image.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function HandleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSpinner(true);
      const url = "https://api.cloudinary.com/v1_1/defvinw4f/image/upload";
      const formData = new FormData();
      formData.append("file", productImage);
      formData.append("cloud_name", "defvinw4f");
      formData.append("upload_preset", "olxClone");
      const response = await axios.post(url, formData);
      const imageUrl = response.data.secure_url;
      
      const fullProductData = {
        ...productData,
        ImageURL: imageUrl,
        createdAt: new Date(),
      };
      await addDoc(collection(db, "products"), fullProductData);
      navigate("/");
      setSpinner(false);
      toast.success("Post added successfully");
    } catch (error) {
      setSpinner(false);
      console.error("Error uploading product:",error);
    }
  }

  return (
    <>
      {spinner ? (
        <div className="spinner">
          <BeatLoader color="#4d7068" />
        </div>
      ) : (
        <>
          <div className="product-upload-wrapper">
            <div className="product-upload-card">
                <h2 className="product-upload-title">POST YOUR AD</h2>
              <form onSubmit={HandleSubmit}>

                <label htmlFor="name">Ad title *</label>
                <input
                  className="product-input"
                  type="text"
                  id="name"
                  name="Name"
                  onChange={HandleProduct}
                  placeholder="Enter product name"
                />
                {errors.Name && <p className="error-text">{errors.Name}</p>}
                 <hr/>
                <label htmlFor="category">Category</label>
                <input
                  className="product-input"
                  type="text"
                  id="category"
                  name="category"
                  onChange={HandleProduct}
                  placeholder="Enter category"
                />
                {errors.category && (
                  <p className="error-text">{errors.category}</p>
                )}
                <hr />
                <h3 style={{marginBottom:"10px",fontSize:"25px",color:"#000"}}>SET A PRICE</h3>
                <label htmlFor="price">Price*</label>
                <input
                  className="product-input"
                  type="number"
                  id="price"
                  name="Price"
                  onChange={HandleProduct}
                  placeholder="Enter price"
                />
                {errors.Price && <p className="error-text">{errors.Price}</p>}
                <hr />
                <h3 style={{marginBottom:"10px",fontSize:"25px",color:"#000"}}>UPLOAD UP TO 12 PHOTOS</h3>
                {productImage && (
                  <div className="product-image-preview">
                    <img
                      alt="Preview"
                      width="200px"
                      height="200px"
                      src={URL.createObjectURL(productImage)}
                    />
                  </div>
                )}

                <input
                  className="product-file-input"
                  onChange={handleImage}
                  type="file"
                />
                {errors.Image && <p className="error-text">{errors.Image}</p>}
                <hr />
                <button type="submit" className="product-upload-btn">
                  Post Now
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Create;