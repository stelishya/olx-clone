import React from 'react';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts.jsx';
import Footer from '../Components/Footer/Footer';
import MenuBar from '../Components/Banner/MenuBar.jsx';

function HomePage() {
  return (
    <div className="homeParentDiv">
      <Header />
      <MenuBar/>
      <Posts />
      <Banner />
      <Footer />
    </div>
  );
}

export default HomePage;
 