import logo from "./logo.svg";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/LoginPage";
import BasketPage from "./pages/BasketPage";
import HomePage from "./pages/HomePage";
import FeedbackPage from "./pages/FeedbackPage";
import ThankYouPage from "./pages/ThankYouPage";
import RestAssurePage from "./pages/RestAssurePage";
import PhoneNumberPage from "./pages/PhoneNumberPage";

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginPage />} exact={true}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/basket" element={<BasketPage />}></Route>
          <Route path="/feedback" element={<FeedbackPage />}></Route>
          <Route path="/thankyou" element={<ThankYouPage />}></Route>
          <Route path="/restassure" element={<RestAssurePage />}></Route>
          <Route path="/phonenumber" element={<PhoneNumberPage />}></Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
