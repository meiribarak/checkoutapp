import React, { useEffect, useContext } from "react";
import "./../components/ui/css/styles.css";
import CustomerLogo from "../components/ui/CustomerLogo";
import BasketContext from "../components/store/basket-context";
import { useNavigate } from "react-router-dom";

function RestAssurePage() {
  const basketCtx = useContext(BasketContext);
  const navigate = useNavigate();

  const navigateToThankYou = { response: "Understand", page: "/thankyou" };
  
  function actionHandler(navigateTo)
  {
    basketCtx.logConsumerHistory({ key: "RestAssurePage", value: navigateTo.response });    
    console.log("navigate to " + navigateTo.page);
    navigate(navigateTo.page);
  } 

  return (
    <div className="fullBlock">
      <CustomerLogo />
      <p className="txt40x50 midSpace">
        Rest assured <br />
        a real person will review your basket <br />
        and charge you the correct <br />
        amount within 30 minutes
      </p>
      <button className="button button--big" onClick={()=>{actionHandler(navigateToThankYou);}}>Understant</button>
    </div>
  );
}

export default RestAssurePage;
