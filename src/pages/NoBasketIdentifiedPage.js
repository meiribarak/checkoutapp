import "./../components/ui/css/styles.css";
import CustomerHeader from "../components/ui/CustomerHeader";
import BuddyLogo from "../components/ui/BuddyLogo";
import React, { useContext } from "react";
import BasketContext from "../components/store/basket-context";
import { useNavigate } from "react-router-dom";

// ==================
// Navigation Mapping
// ==================
const actionLeaveItems = { response: "LeaveItems", navigateTo: "/feedbackyouropinion" };
const actionGetReceipt = { response: "GetReceipt", navigateTo: "/phonenumber" };
const actionTrustYou = { response: "TrustYou", navigateTo: "/thankyou" };  // NEED TO FINISH!!!

// ====
// Page
// ====
const NoBasketIdentifiedPage = () => {
  const basketCtx = useContext(BasketContext);
  const navigate = useNavigate();
  
  console.log("NoBasketIdentifiedPage");

  function actionHandler(action) {
    basketCtx.updateJourney({ key: "NoBasketIdentifiedPage", value: action.response });
    console.log("navigate to " + action.navigateTo);
    navigate(action.navigateTo, { ShowTrustYou: false });
  }
    
  return (
    <div>
      <CustomerHeader />
      <main className="cntBody cntBody--str">
        <BuddyLogo icon="store" alt="buddy no cart logo"/>
        <p className="txt40x50 mb4vh">We're very sorry</p>
        <p className="txt25x25">
          Our store could not accurately detect which items you currently have.
          <br />
          Rest assured a real person is reviewing your visit <br />
          to charge you the correct amount within 30 minutes <br />
          <br />
          You can put down your items without being charged <br />
          or leave as planned knowing an expert will review your visit.
        </p>

        <nav className="naviger">
          <div className="navigerButtoms">
            <button className="button button--red button--big button--fixHeight" onClick={() => { actionHandler(actionLeaveItems) }}>
              Leave My Items
            </button>

            <button className="button button--big button--fixHeight" onClick={() => { actionHandler(actionGetReceipt) }}>
              Stuff happens.
              <br />
              Get Receipt
            </button>
            <button className="button button--empty button--big button--fixHeight"></button>
            <button className="button button--tran button--big button--fixHeight" onClick={() => { actionHandler(actionTrustYou) }}>
              I trust you.
              <br />
              No receipt for me.
              <br />
              Thanks!
            </button>
          </div>
        </nav>
      </main>
    </div>
  );
};

export default NoBasketIdentifiedPage;
