import React, { useState } from "react";
import Logo from "../../assets/olx-logo.svg";
import "./Signup.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

const errorMessages = {
  "auth/email-already-in-use": "This email is already registered.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/invalid-credential": "Incorrect Email or Password.",
};

export default function Signup() {

  const [User, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({});
  // const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const err = {};

    if (User.name.trim().length < 3)
      err.name = "Name must be at least 3 characters";

    if (!User.email.trim().match(/^\S+@\S+\.\S+$/))
      err.email = "Enter a valid email";

    if (!User.phone.match(/^\d{10}$/)) 
      err.phone = "Phone must be 10 digits";

    if (User.password.trim().length < 6)
      err.password = "Password must be at least 6 characters";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("User:",User)
    try {
      setSpinner(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        User.email,
        User.password
      );
      console.log("User created:", result.user.uid);
      if (result.user) {
          console.log("Result:",result.user)
        await updateProfile(result.user, { displayName: User.name });
        console.log("Profile updated");
        console.log("hii")
        await setDoc(doc(db, "User", result.user.uid), {
          name: User.name,
          phone: User.phone,
        });
        console.log("Firestore write success");
        console.log("hello user")
        navigate("/login", { replace: true });
        setSpinner(false);
      }
    } catch (error) {
      setSpinner(false);
      console.error("Signup Error:", error);
      const errorCode = error.code;
      const message =
        errorMessages[errorCode] || "Something went wrong , Please try again";
      toast.error(message);
    }
  };

  const HandleDataChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  return (
    <>
      {spinner ? (
        <div className="spinner">
          <BeatLoader color="#4d7068" />
        </div>
      ) : (
        <div className="signupWrapper">
          <div className="signupParentDiv">
            <img width="120px" src={Logo} alt="Logo" />
            <form onSubmit={HandleSubmit}>
              <label htmlFor="username">Username</label>
              <input
                className="input"
                type="text"
                id="username"
                name="name"
                placeholder="Enter your username"
                onChange={HandleDataChange}
                value={User.name}
              />
              {errors.name && <span className="error">{errors.name}</span>}

              <label htmlFor="email">Email</label>
              <input
                className="input"
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={HandleDataChange}
                value={User.email}
              />
              {errors.email && <span className="error">{errors.email}</span>}

              <label htmlFor="phone">Phone</label>
              <input
                className="input"
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone"
                onChange={HandleDataChange}
                value={User.phone}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}

              <label htmlFor="password">Password</label>
              <input
                className="input"
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                onChange={HandleDataChange}
                value={User.password}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}

              <button type="submit">Signup</button>
            </form>
            <p className="loginText">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}