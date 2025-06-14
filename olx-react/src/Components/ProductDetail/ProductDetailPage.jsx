import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';

import styles from './ProductDetailPage.module.css';
import { FaShareAlt, FaRegHeart, FaMapMarkerAlt, FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Arrow from '../../assets/Arrow';


const ProductDetailPage = () => {
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const { id } = useParams(); 
  
    const [categories] = useState(["Cars", "Motorcycles", "Mobile Phones", "For Sale: Houses & Apartments", "Scooters", "Commercial & Other Vehicles", "For Rent: Houses & Apartments"]);

    useEffect(() => {
      if (id) {
        fetch(`https://dummyjson.com/products/${id}`)
          .then(res => res.json())
          .then(data => {
            setProduct(data);
            setSelectedImage(data.thumbnail);
          });
      }
    }, [id]);
    // if (!product) {
    //     return <div>Loading...</div>; 
    //   }
  return (
    <>
    <Header />
    <div style={{ paddingTop: '70px' }}>
    <div className={styles.menuBar}>
        <div className={styles.categoryMenu}>
          <span>ALL CATEGORIES</span>
          <Arrow />
        </div>
        <div className={styles.otherQuickOptions}>
          {categories.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </div>
      {!product ? (
        <div>Loading...</div>
      ) : (
    <div className={styles.productDetailPage}>
      <div className={styles.breadcrumb}>
        <span>Home</span> &gt; <span>{product.category}</span> &gt; <span>...</span>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          <div className={styles.imageGallery}>
          <div className={styles.mainImageContainer}>
            <img src={selectedImage} alt={product.title} className={styles.mainImage}/>
            <div className={styles.imageCounter}>1 / {product.images.length}</div>
          </div>
            {/* <button className={`${styles.navButton} ${styles.prevButton}`}><FaChevronLeft /></button>
            <button className={`${styles.navButton} ${styles.nextButton}`}><FaChevronRight /></button>
            <div className={styles.imageActions}>
              <FaShareAlt />
              <FaRegHeart />
            </div> */}
          <div className={styles.thumbnailContainer}>
              {product.images.map((img, index) => (
                  <img 
                  key={index} 
                  src={img} 
                  alt={`${product.title} thumbnail ${index + 1}`}
                  className={`${styles.thumbnail} ${selectedImage === img ? styles.selectedThumbnail : ''}`}
                  onClick={() => setSelectedImage(img)}
                  />
                ))}
            </div>
                </div>
            <div className={styles.description}>
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>
        {/* </div> */}
        <div className={styles.rightColumn}>
            <div className={styles.detailsCard}>
                <div className={styles.priceSection}>
                    <h2>₹ {product.price.toLocaleString('en-IN')}</h2>
                    <div className={styles.actions}>
                        <FaShareAlt />
                        <FaRegHeart />
                    </div>
                </div>     
                <p className={styles.productTitle}>{product.title}</p>
                <p className={styles.location}>{product.brand}</p>
                <p className={styles.date}>6 days ago</p>
            </div>
            <div className={styles.sellerCard}>
            <div className={styles.sellerInfo}>
                <img src="https://i.pravatar.cc/50" alt="Seller" />
                <div>
                    <p><strong>AR FURNITURE</strong></p>
                    <p>Member since May 2018</p>
                </div>
                <FaChevronRight />
            </div>
            <div className={styles.itemsListed}>90 items listed</div>
            <button className={styles.chatButton}>Chat with seller</button>
            <a href="#" className={styles.showNumber}>Show number</a>
          </div>
          <div className={styles.postedInCard}>
              <h2>Posted in</h2>
              <p>{product.brand}, {product.category}</p>
              {/* You might need a map component here */}
          </div>

          <div className={styles.adInfo}>
            <p>AD ID {product.id}</p>
            <a href="#">REPORT THIS AD</a>
          </div>
          </div>
          {/* <div className={styles.productInfo}>
            <span className={styles.verifiedSeller}>VERIFIED SELLER</span>
            <h1>Mercedes-Benz Gls (2017)</h1>
            <p className={styles.subTitle}>3.0 350d 4MATIC</p>
            <div className={styles.specs}>
              <span>DIESEL</span>
              <span>100,000 KM</span>
              <span>AUTOMATIC</span>
            </div>
          </div> */}

          {/* <div className={styles.overview}>
            <h2>Overview</h2>
            <div className={styles.overviewDetails}>
              <div>
                <p><strong>Owner</strong></p>
                <p>1st</p>
              </div>
              <div>
                <FaMapMarkerAlt />
                <p><strong>Location</strong></p>
                <p>Ernakulam HPO, Kochi</p>
              </div>
              <div>
                <FaCalendarAlt />
                <p><strong>Posting date</strong></p>
                <p>13-JUN-25</p>
              </div>
            </div>
          </div> */}

          {/* <div className={styles.description}>
            <h2>Description</h2>
            <p>
              2017 MERCEDES BENZ GLS 350 D<br />
              FIRST OWNER | 100000 KMS<br />
              PY REG | FANCY NG<br />
              NO ACCIDENTS<br />
              WELL MAINTAINED<br />
              | LOAN AVAILABLE UPTO 90 % |<br />
              | EXCHANGE AVAILABLE |<br />
              ADDITIONAL VEHICLE INFORMATION:<br />
              Insurance Type: Comprehensive<br />
              Registration Place: PY<br />
              Exchange: Yes<br />
              Finance: Yes
            </p>
          </div> */}
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.priceCard}>
            <h2>₹ 39,50,000</h2>
            <button className={styles.offerButton}>Make offer</button>
          </div>

          <div className={styles.sellerCard}>
            <div className={styles.sellerInfo}>
                <img src="https://via.placeholder.com/50" alt="Seller" />
                <div>
                    <p><strong>Posted by Aju 777</strong></p>
                    <p>Member since May 2016</p>
                </div>
                <FaChevronRight />
            </div>
            <button className={styles.chatButton}>Chat with seller</button>
            <a href="#" className={styles.showNumber}>Show number</a>
          </div>

          <div className={styles.adInfo}>
            <p>AD ID 1807017676</p>
            <a href="#">REPORT THIS AD</a>
          </div>
        </div>
      </div>

      <div className={styles.relatedAds}>
        <h2>Related ads</h2>
        <div className={styles.adsCarousel}>
            {/* Placeholder for related ad cards */}
            {[1, 2, 3].map(ad => (
                <div key={ad} className={styles.adCard}>
                    <img src="https://via.placeholder.com/200x150.png/000/fff?text=Related+Ad" alt="Related Ad" />
                    <p>₹ 42,50,000</p>
                    <p>Mercedes-Benz GLS 350d</p>
                </div>
            ))}
        </div>
      </div>

      {/* <div className={styles.relatedLinks}>
        <a href="#">Used Mercedes-Benz Cars in Kochi</a>
        <a href="#">Used Mercedes-Benz GLS Cars in Kochi</a>
        <a href="#">Used Diesel Cars in Kochi</a>
        <a href="#">Used Automatic Cars in Kochi</a>
        <a href="#">Used Cars Under 40 Lakhs in Kochi</a>
      </div> */}

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
            {/* Footer links as per image */}
        </div>
        <div className={styles.footerBottom}>
            {/* Bottom footer content */}
        </div>
      </footer>
    </div>
      )}
    <Footer />
    </div>
    </>
  );
};

export default ProductDetailPage;