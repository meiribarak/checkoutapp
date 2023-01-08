import React, { useContext } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import BasketPage from "./pages/BasketPage";
import HomePage from "./pages/HomePage";
import FeedbackPage from "./pages/FeedbackPage";
import ThankYouPage from "./pages/ThankYouPage";
import RestAssurePage from "./pages/RestAssurePage";
import PhoneNumberPage from "./pages/PhoneNumberPage";
import AuthPage from "./pages/AuthPage";
import CartEmptyPage from "./pages/CartEmptyPage";
import AuthContext from "./components/store/auth-context";
import NoBasketIdentifiedPage from "./pages/NoBasketIdentifiedPage";
import FeedbackWentWrongReasonPage from './pages/FeedbackWentWrongReasonPage';
import FeedbackCartEmptyReasonPage from './pages/FeedbackCartEmptyReasonPage';

function App() {
  const authCtx = useContext(AuthContext);
  
  
  return (
    <div>
      <Routes>
        <Route path="/login" element={<AuthPage />} exact={true}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/basket" element={<BasketPage />}></Route>
        <Route path="/feedback" element={<FeedbackPage />}></Route>
        <Route path="/thankyou" element={<ThankYouPage />}></Route>
        <Route path="/restassure" element={<RestAssurePage />}></Route>
        <Route path="/phonenumber" element={<PhoneNumberPage />}></Route>
        <Route path="/cartempty" element={<CartEmptyPage />}></Route>
        <Route path="/nobasket" element={<NoBasketIdentifiedPage />}></Route>
        <Route path="/feedbackwentwrongreason" element={<FeedbackWentWrongReasonPage />}></Route>
        <Route path="/feedbackyouropinion" element={<FeedbackCartEmptyReasonPage />}></Route>
        <Route path="*" element={<Navigate replace to="/"/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

//<Route path="/" element={authCtx.isLoggedIn ? <HomePage /> : <Navigate replace to="/login"/>}></Route>