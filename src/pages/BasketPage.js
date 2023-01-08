import React, { useEffect, useContext, useState } from "react";
import "./../components/ui/css/styles.css";
import CustomerHeader from "../components/ui/CustomerHeader";
import BasketItemsList from "../components/checkout/BasketItemsList";
import BasketContext from "../components/store/basket-context";
import { useNavigate } from "react-router-dom";
//import AuthContext from "../components/store/auth-context";

// ==================
// Navigation Mapping
// ==================
const actionAllRight = { response: "AllRight", navigateTo: "/feedback" };
const actionGetReceipt = { response: "GetReceipt", navigateTo: "/phonenumber" };
const actionSomethingWentWrong = { response: "SomethingIsWrong", navigateTo: "/feedbackwentwrongreason" };

let basketItems = {};
let totalItems = 1;
let peopleInGroup = 1;

// ====
// Page
// ====
function BasketPage() {  
  //const authCtx = useContext(AuthContext);
  const basketCtx = useContext(BasketContext);
  const hasItems = basketCtx.hasBasket();
  const [isBasketItemsLoaded, setBasketItemsLoaded] = useState(hasItems);
  const navigate = useNavigate();
  
  console.log("BasketPage");

  const loadbasketItemsFromContext = () => {
    console.log("Load basket context, has items: ", hasItems);
    basketItems = basketCtx.basket.items;
    totalItems = basketCtx.basket.totalItems;
    peopleInGroup = basketCtx.basket.peopleInGroup;
    setBasketItemsLoaded(true);       
  }

  function actionHandler(action) {
    basketCtx.updateJourney({ key: "BasketPage", value: action.response });    
    console.log("navigate to " + action.navigateTo);
    navigate(action.navigateTo);
  };

  useEffect(() => {
                     
    console.log("basket context: ", basketCtx);  
    loadbasketItemsFromContext();    

  }, [isBasketItemsLoaded]);
  
  return (
    <div className="minHg">
      <CustomerHeader />
      {isBasketItemsLoaded ? 
        <BasketItemsList items={basketItems} /> :
        <BasketItemsList />}
      <nav className="naviger">
        <div className="navigerTop">
          <div className="navigerTop__item">
            <p className="txt35x43 w700">People in group:</p>
            <p className="txt48x50">{peopleInGroup} </p>
          </div>
          <div className="navigerTop__item">
            <p className="txt35x43 w700">Subtotal</p>
            <p className="txt48x50">{totalItems} </p>
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
