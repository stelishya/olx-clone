import { createContext, useState } from "react";
import {db} from '../firebase/config';

export const FirebaseContext = createContext(null);
export const AuthContext = createContext(null);

export default function FirebaseProvider({ children }) {
  
  const [user, setUser]= useState(null)
  // const [userData, setUserData] = useState({});

  return (
    <FirebaseContext.Provider value={{ db }}>
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    </FirebaseContext.Provider>
  );
}