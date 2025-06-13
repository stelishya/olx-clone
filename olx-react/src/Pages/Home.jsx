import React from 'react';

import Header from '../Components/Header/header';
import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts.jsx';
import Footer from '../Components/Footer/Footer';

function HomePage() {
  return (
    <div className="homeParentDiv">
      <Header />
      <Banner />
      <Posts />
      <Footer />
    </div>
  );
}

export default HomePage;
 