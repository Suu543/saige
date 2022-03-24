import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Home from "./pages/Home";
import Header from "./components/nav/Header";

import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  // To check firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        console.log("user", user);

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult,
          },
        });
      }
    });

    // clean up
    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/register/complete" element={<RegisterComplete />} />
        <Route exact path="/forgot/password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
