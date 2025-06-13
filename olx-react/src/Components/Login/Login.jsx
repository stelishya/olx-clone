import Logo from "../../assets/olx-logo.svg";
import "./Login.css"
import {useState,useContext} from "react"
import {Link,useNavigate} from "react-router-dom"
import { signInWithEmailAndPassword as loginUser } from "firebase/auth";
import {auth} from "../../firebase/config.js";
import { FirebaseContext } from "../../context/firebaseContext";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

const errorMessages = {
  "auth/email-already-in-use": "This email is already registered.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/invalid-credential": "Incorrect Email or Password.",
};

function Login(){
    const [user,setUser] = useState({email:"",password:""})
    const [errors, setErrors] = useState({});
    const [spinner, setSpinner] = useState(false);
    const navigate = useNavigate();
    const { setUserData } = useContext(FirebaseContext);

      const validation = () => {
    const err = {};

    if (!user.email.match(/^\S+@\S+\.\S+$/)) 
      err.email = "Enter a valid email";

    if (user.password.length < 6)
      err.password = "Password must be at least 6 characters";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

    const handleData = (e) =>{
        setUser((u)=>({...u,[e.target.name] : e.target.value}))
        console.log(user)
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if (!validation()) return;
        try {
          setSpinner(true);
          const userCredentials = await loginUser(
            auth,
            user.email,
            user.password
          );
          const userData = userCredentials.user;
          console.log("userCredentials: ",userCredentials);

          if (userData) {
            console.log("userData",userData);
            setUserData(userData);
            navigate("/", { replace: true });
            setSpinner(false);
            toast.success("Successully Logged In");
          }
        } catch (error) {
          setSpinner(false);
          console.log("Login error", error);
          const errorCode = error.code;
          const message =
            errorMessages[errorCode] || "Something went wrong , Please try again";
          toast.error(message);
        }
    };  

    return (
        <>
            {spinner ? (
        <div className="spinner">
          <BeatLoader color="#4d7068" />
        </div>
      ) : (
        <div className="loginWrapper">
            <div className="loginParentDiv">
                <img style={{width:"120px", height:"120px"}} src={Logo} alt="olx-logo" />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input 
                    className="input"
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleData}
                    placeholder="Enter your Email"
                    />
                {errors.email && <span className="error">{errors.email}</span>}
                <label htmlFor="password">Password</label>
                <input
                className="input"
                type="password"
                id="password"
                name="password"
                onChange={handleData}
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}

                <button type="submit">Login</button>
                </form>
                <p className="signupText">
              Don't have an account? <Link to="/signup">Signup</Link>
            </p>
            </div>
        </div>
        )}  
        </>
    )
}

export default Login