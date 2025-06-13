import React, {useContext} from "react";

import "./Header.css";
import Logo from "../../assets/olx-logo.svg"
// import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import Heart from "../../assets/Heart";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext } from "../../context/firebaseContext";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";




function Header() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  async function HandleLogout() {
    try {
      await signOut(auth);
      navigate("/login");
      toast.success('LogOut successully')
    } catch (error) {
      console.log("Logout failed:", error);
    }
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div onClick={()=>navigate('/')} className="brandName">
        <img style={{height:"50px",width:"50px"}} src={Logo} alt="olx-logo" />
          {/* <OlxLogo/> */}
        </div>
        <div className="placeSearch">
          <Search className="search-icon" />
          <input type="text" placeholder="Kerala" />
          {/* <button></button> */}
          <Arrow/>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Search car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="wishlist">
            <Heart/>
        </div>
        <div className="userDropdown">
          <span className="userName">
            {user?.displayName ? (
              user.displayName
            ) : (
              <span className="loginSpan" onClick={() => navigate("/login")}>Login</span>
            )}
          </span>
       

          {user && (
            <div className="dropdownContent">
              <p onClick={HandleLogout}>Logout</p>
            </div>
          )}

          <hr />
        </div>
     
        <div className="sellMenu">
          <SellButton></SellButton>
          {user?
          <div onClick={() => navigate("/create")} className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
              :
             <div onClick={() =>toast.error('Please Login first')} className="sellMenuContent">
             <SellButtonPlus></SellButtonPlus>
             <span>SELL</span>
           </div>
}
        </div>
      </div>
    </div>
  );
}

export default Header;