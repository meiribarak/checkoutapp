import React, { useContext, useState } from "react";
import "./../components/ui/css/styles.css";
import CustomerHeader from "../components/ui/CustomerHeader";
import BasketContext from "../components/store/basket-context";
import { useNavigate } from "react-router-dom";
import cryCartIcon from "../components/ui/images/cart.png";

const CartEmptyPage = () => {
  const basketCtx = useContext(BasketContext);
  const navigate = useNavigate();

  const navigateToFeedback = { response: "AllRight", page: "/feedback" };
  const navigateToPhoneNumber = {
    response: "GetReceipt",
    page: "/phonenumber",
  };
  const navigateToRestAssure = {
    response: "SomethingIsWrong",
    page: "/restassure",
  };

  console.log("CartEmptyPage");
  console.log(basketCtx);

  function actionHandler(navigateTo) {
    basketCtx.logConsumerHistory({
      key: "CartEmptyPage",
      value: navigateTo.response,
    });
    console.log("navigate to " + navigateTo.page);
    //navigate(navigateTo.page);
  }

  // useEffect(() => {
  //   basketCtx.updateDummyBasket();
  //   console.log(basketCtx);
  // }, [basketCtx]);

  return (
    <div>
      <CustomerHeader />
      <main className="cntBody">
        <div className="cartIco">
          <img src={cryCartIcon} alt="empty cart" />
        </div>
        <p className="txt40x50">
          It looks like your basket is empty <br />
          If there is a problem, please let us know
        </p>

        <nav className="naviger">
          <div className="navigerButtoms">
            <button
              className="button button--big button--fixHeight"
              onClick={() => {
                actionHandler(navigateToRestAssure);
              }}
            >
              That's correct <br />I do not have anything
            </button>

            <button
              className="button button--yellow button--big button--fixHeight"
              onClick={() => {
                actionHandler(navigateToRestAssure);
              }}
            >
              That's not right. <br />
              I am trying to buy <br />
              something
            </button>
          </div>
        </nav>
      </main>
    </div>
  );
};

export default CartEmptyPage;
