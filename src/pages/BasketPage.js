import React, { useEffect, useContext, useState } from "react";
import "./../components/ui/css/styles.css";
import CustomerHeader from "../components/ui/CustomerHeader";
import BasketItemsList from "../components/checkout/BasketItemsList";
import BasketContext from "../components/store/basket-context";
import { useNavigate } from "react-router-dom";

// ==================
// Navigation Mapping
// ==================
const actionAllRight = { response: "AllRight", navigateTo: "/feedback" };
const actionGetReceipt = { response: "GetReceipt", navigateTo: "/phonenumber" };
const actionSomethingWentWrong = { response: "SomethingIsWrong", navigateTo: "/feedbackwentwrongreason" };

let basketItems, totalItems, peopleInGroup;

// ====
// Page
// ====
function BasketPage() {
  const [isBasketItemsLoaded, setBasketItems] = useState(false);
  const basketCtx = useContext(BasketContext);
  const navigate = useNavigate();
  
  console.log("BasketPage");
  console.log(basketCtx);
  console.log("has items: ", basketCtx.hasBasket());
  const items = basketCtx.getBasketItems();
  console.log(items);

  useEffect(() => {
    basketItems = basketCtx.getBasketItems();
    totalItems = basketCtx.getTotalItems();
    peopleInGroup = basketCtx.getPeopleInGroup();
    setBasketItems(true);
  }, [isBasketItemsLoaded]);
  
  function actionHandler(action) {
    basketCtx.updateJourney({ key: "BasketPage", value: action.response });    
    console.log("navigate to " + action.navigateTo);
    navigate(action.navigateTo);
  };
  
  return (
    <div className="minHg">
      <CustomerHeader />
      <BasketItemsList items={basketItems} />
      <nav className="naviger">
        <div className="navigerTop">
          <div className="navigerTop__item">
            <p className="txt35x43 w700">People in group:</p>
            <p className="txt48x50">{peopleInGroup}</p>
          </div>
          <div className="navigerTop__item">
            <p className="txt35x43 w700">Subtotal</p>
            <p className="txt48x50">{totalItems}</p>
          </div>
        </div>
        <div className="navigerButtoms">
          <button
            className="button button--big button--red button--fixHeight"
            onClick={() => { actionHandler(actionSomethingWentWrong); }}
          >
            Something
            <br />
            is not right
          </button>

          <button className="button button--big" onClick={() => { actionHandler(actionAllRight); }}>
            All right
          </button>
          <div className="button button--big button--empty"></div>
          <button className="button button--big" onClick={()=>{actionHandler(actionGetReceipt);}}>
            Get receipt
          </button>
        </div>
      </nav>
    </div>
  );
}

export default BasketPage;
