import React, { useContext } from "react";
import "./../components/ui/css/styles.css";
import CustomerHeader from "../components/ui/CustomerHeader";
import BasketContext from "../components/store/basket-context";
import { useNavigate } from "react-router-dom";
import BuddyLogo from "../components/ui/BuddyLogo";


// ==================
// Navigation Mapping
// ==================
const actionCorrect = { response: "Correct", navigateTo: "/feedback" };
const actionNotRight = { response: "NotRight", navigateTo: "/phonenumber" };

// ====
// Page
// ====
const CartEmptyPage = () => {
  const basketCtx = useContext(BasketContext);
  const navigate = useNavigate();
  
  console.log("CartEmptyPage");

  function actionHandler(action) {
    basketCtx.updateJourney({ key: "CartEmptyPage", value: action.response });
    console.log("navigate to " + action.navigateTo);
    navigate(action.navigateTo, { ShowTrustYou: true });
  }
  
  return (
    <div>
      <CustomerHeader />
      <main className="cntBody">
        <BuddyLogo icon="cart" alt="buddy empty cart logo"/>
        <p className="txt40x50">
          It looks like your basket is empty <br />
          If there is a problem, please let us know
        </p>

        <nav className="naviger">
          <div className="navigerButtoms">
            <button
              className="button button--big button--fixHeight"
              onClick={() => { actionHandler(actionCorrect) }}
            >
              That's correct <br />I do not have anything
            </button>

            <button
              className="button button--yellow button--big button--fixHeight"
              onClick={() => { actionHandler(actionNotRight) }}
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
