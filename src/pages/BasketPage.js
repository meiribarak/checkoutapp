import React, { useEffect, useContext } from "react";
import "./../components/ui/css/styles.css";
import CustomerHeader from "../components/ui/CustomerHeader";
import BasketItemsList from "../components/checkout/BasketItemsList";
import BasketContext from "../components/store/basket-context";
import { useNavigate } from "react-router-dom";

function BasketPage() {
  const basketCtx = useContext(BasketContext);
  const navigate = useNavigate();

  const navigateToFeedback = { response: "AllRight", page: "/feedback" };
  const navigateToPhoneNumber = { response: "GetReceipt", page: "/phonenumber" };
  const navigateToFeedbackReason = { response: "SomethingIsWrong", page: "/feedbackreason" };

  console.log("BasketPage");
  console.log(basketCtx);
  
  function actionHandler(navigateTo)
  {
    basketCtx.updateJourney({ key: "BasketPage", value: navigateTo.response });    
    console.log("navigate to " + navigateTo.page);
    navigate(navigateTo.page);
  }  

  useEffect(() => {
    basketCtx.updateDummyBasket();
    console.log(basketCtx);
  }, [basketCtx]);

  return (
    <div className="minHg">
      <CustomerHeader />
      <BasketItemsList items={basketCtx.getBasketItems()} />
      <nav className="naviger">
        <div className="navigerTop">
          <div className="navigerTop__item">
            <p className="txt35x43 w700">People in group:</p>
            <p className="txt48x50">{basketCtx.getPeopleInGroup()}</p>
          </div>
          <div className="navigerTop__item">
            <p className="txt35x43 w700">Subtotal</p>
            <p className="txt48x50">{basketCtx.getTotalItems()}</p>
          </div>
        </div>
        <div className="navigerButtoms">
          <button
            className="button button--big button--red button--fixHeight"
            onClick={() => { actionHandler(navigateToFeedbackReason); }}
          >
            Something
            <br />
            is not right
          </button>

          <button className="button button--big" onClick={() => { actionHandler(navigateToFeedback); }}>
            All right
          </button>
          <div className="button button--big button--empty"></div>
          <button className="button button--big" onClick={()=>{actionHandler(navigateToPhoneNumber);}}>
            Get receipt
          </button>
        </div>
      </nav>
    </div>
  );
}

export default BasketPage;
