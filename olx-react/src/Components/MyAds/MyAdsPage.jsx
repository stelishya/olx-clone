import React, { useState, useEffect, useContext } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MenuBar from '../Banner/MenuBar';
// import Arrow from '../../assets/Arrow';
import styles from './MyAdsPage.module.css';
import { FaSearch, FaHeart, FaEye, FaEllipsisH } from 'react-icons/fa';

import { AuthContext, FirebaseContext } from '../../context/firebaseContext';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const MyAdsPage = () => {
  const [userProducts, setUserProducts] = useState([]);
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  console.log("firebase db : ",db)
  console.log("userProducts : ",userProducts)

  useEffect(() => {
    if (user && db) {
      console.log("Running query for user ID:", user?.uid);
      const fetchUserProducts = async () => {
        try {
//           const dB = getFirestore();
// const querySnapshot = await getDocs(collection(dB, 'products'));
// console.log("All products:", querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

          const productsRef = collection(db, 'products');
          console.log("productsRef",productsRef)
          const q = query(productsRef, where('user', '==', user.uid));
          console.log("q",q)
          const querySnapshot = await getDocs(q);
          console.log("querySnapshot",querySnapshot)
          const allPosts = querySnapshot.docs.map((product) => ({
            ...product.data(),
            id: product.id,
          }));
          console.log("allPosts",allPosts)
          setUserProducts(allPosts);
        } catch (error){
          console.error("Error fetching user products:", error);
        }
      };
      fetchUserProducts();
      // firebase.firestore().collection('products').where('userId', '==', user.uid).get().then((snapshot) => {
      //   const allPosts = snapshot.docs.map((product) => {
      //     return {
      //       ...product.data(),
      //       id: product.id
      //     };
      //   });
      //   setUserProducts(allPosts);
      // });
    } else {
      console.log("User or DB not available. User:", user ? "exists" : "null", "DB:", db ? "exists" : "null");
    }
  }, [user, db]);

  // const myAds = [
  //   {
  //     id: 1,
  //     title: 'dfffffffghjk',
  //     price: '50',
  //     date: 'JUN 13, 25',
  //     imageUrl: 'https://via.placeholder.com/150',
  //     status: 'REJECTED',
  //     reason: 'OLX doesn\'t allow such Ads on platform. Visit help.olx.in for more details.',
  //     views: 0,
  //     likes: 0,
  //   },
  // ];

  return (
    <div className={styles.myAdsPageContainer}>
      <Header />
      <div style={{ paddingTop: '70px' }}>
        <MenuBar/>
        {/* <div className={styles.menuBar}>
          <div className={styles.categoryMenu}>
            <span>ALL CATEGORIES</span>
            <Arrow />
          </div>
          <div className={styles.otherQuickOptions}>
            {categories.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </div>
        </div> */}

        <main className={styles.mainContent}>
          <div className={styles.sellMoreBanner}>
            <p>Want to sell more?</p>
            <span>Post more Ads for less. Save money with our packages.</span>
            <button>Show me packages</button>
          </div>

          <div className={styles.adsHeader}>
            <h3>ADS</h3>
          </div>

          <div className={styles.filterSection}>
            <div className={styles.searchBar}>
              <FaSearch />
              <input type="text" placeholder="Search by Ad Title" />
            </div>
            <div className={styles.filterButtons}>
              <span>Filter By:</span>
              <button className={styles.activeFilter}>View all ({userProducts.length})</button>
              <button>Active Ads (0)</button>
              <button>Inactive Ads (0)</button>
              <button>Pending Ads (0)</button>
              <button>Moderated Ads (1)</button>
            </div>
          </div>

          <div className={styles.adsList}>
            {userProducts.length > 0 ? (
              userProducts.map((ad) => (
              <div key={ad.id} className={styles.adCard}>
                <div className={styles.adCardRejected}>
                  <div className={styles.adDate}>FROM: {ad.createdAt.toDate().toLocaleDateString()}</div>
                  <div className={styles.adDetails}>
                    <img src={ad.ImageURL} alt={ad.Name} />
                    <div className={styles.adInfo}>
                      <p>{ad.Name}</p>
                    </div>
                    <div className={styles.adPrice}>₹ {ad.Price}</div>
                    <div className={styles.adStatus}>
                      <span className={styles.activeTag}>Active</span>
                    </div>
                <div className={styles.rejectedReason}>
                    <p>This ad currently live.</p>
                    <FaEllipsisH className={styles.ellipsisIcon} />
                </div>
                  </div>
                  <hr />
                  <div className={styles.adStats}>
                    <span><FaEye /> Views: 2</span>
                    <span><FaHeart /> Likes: 1</span>
                    <button className={styles.learnMoreBtn}>Mark as Sold</button>
                    <button className={styles.learnMoreBtn}>Sell faster now</button>
                  </div>
                </div>
              </div>
            ))
          ):(
            <p style={{ textAlign: 'center',color:"black" }}>You haven't posted any ads yet.</p>
          )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MyAdsPage;