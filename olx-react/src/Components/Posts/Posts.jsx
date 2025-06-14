import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { PostContext } from "../../context/postContext";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

import Heart from "../../assets/Heart";
import MenuBar from "../Banner/MenuBar";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../firebase/config";
import "./Posts.css";


function Posts() {
  const { setPostDetails } = useContext(PostContext);
 
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    async function fetchDummyProducts() {
      try {
        setSpinner(true);
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
  
        const formatted = data.products.map((item) => ({
          id: item.id,
          Name: item.title,
          Price: item.price,
          category: item.category,
          ImageURL: item.thumbnail,
          createdAt: { seconds: Math.floor(Date.now() / 1000) } // fake timestamp
        }));
  
        setProducts(formatted);
        setSpinner(false);
      } catch (error) {
        console.log("Failed to fetch products", error);
        setSpinner(false);
      }
    }
  
    fetchDummyProducts();
  }, []);
  
  // useEffect(() => {
  //   async function fetchProducts() {
  //     try {
  //       setSpinner(true);
  //       const snapshot = await getDocs(collection(db, "products"));
  //       const products = snapshot.docs.map((product) => ({
  //         id: product.id,
  //         ...product.data(),
  //       }));
  //       setSpinner(false);
  //       setProducts(products);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchProducts();
  // }, []);

  function HandleView(product) {
    setPostDetails(product);
    navigate("/view");
  }
  return (
    <>
    <MenuBar/>
      {spinner ? (
        <div className="spinner">
          <BeatLoader color="#4d7068" />
        </div>
      ) : (
        <div className="postParentDiv">
          <div className="moreView">
            <div className="heading">
              {/* <span>Quick Menu</span> */}
              <span>Fresh Recommendations</span>
           

              {/* <span>View more</span> */}
            </div>
            <div className="cards">
              {products.map((pro) => (
                <Link to={`/product/${pro.id}`} key={pro.id} className="card-link">

                <div
                  className="card"
                >
                  <div className="favorite">
                    <Heart />
                  </div>
                  <div className="image">
                    <img src={pro.ImageURL} alt={pro.Name || "product"} />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {pro.Price}</p>
                    <span className="kilometer">{pro.category}</span>
                    <p className="name">{pro.Name}</p>
                  </div>
                  <div className="date">
                    <span>
                      {pro?.createdAt
                        ? new Date(pro.createdAt.seconds * 1000).toDateString()
                        : ""}
                    </span>
                  </div>
                </div>
                </Link>
              ))}
            </div>
            <button className="loadMoreBtn">Load more</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Posts;