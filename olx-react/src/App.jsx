import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import ProductDetailPage from './Components/ProductDetail/ProductDetailPage.jsx'
import MyAdsPage from './Components/MyAds/MyAdsPage';
import ProtectedRoute from './Components/ProtectedRoute';

import { useContext, useEffect } from 'react'
import { AuthContext } from './context/firebaseContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/config'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Post from './context/postContext.jsx'
import { ToastContainer } from 'react-toastify'

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    { path: "/create", 
        element: (
            <ProtectedRoute>
                <Create />
            </ProtectedRoute>
        ) 
},
    { path: "/view", 
        element: (
            <ProtectedRoute>
                <View />
            </ProtectedRoute>
        ) 
},
    { path: "/product/:id", 
        element: (
            <ProtectedRoute>
                <ProductDetailPage />
            </ProtectedRoute>
        )  
},
    { path: "/my-ads", 
        element: (
            <ProtectedRoute>
                <MyAdsPage />
            </ProtectedRoute>
        ) 
},
]);

function App() {
    const { user, setUser } = useContext(AuthContext)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('Auth state changed:', currentUser);
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, [setUser]);

    return (
        <>
            <ToastContainer theme='dark' />
            <Post>
                <RouterProvider router={router} />
            </Post>
        </>
    )
}

export default App
