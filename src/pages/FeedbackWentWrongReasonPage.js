import "./../components/ui/css/styles.css";
import customerLogo from "../components/ui/images/logo.png";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import BasketContext from "../components/store/basket-context";
import JRSaveConsumerData from "../components/fetch/FetchData";

// ================
// Feedback Mapping
// ================
const feedbackMapping = {
  WrongProduct: { Value: 1 },     // Wrong product
  MissingProduct: { Value: 2 },   // Missing product
  WrongQuantity: { Value: 3 },    // Wrong quality
  WrongGroupSize: { Value: 4 },   // Wrong group size
  WrongBasket: { Value: 5 },      // Wrong basket
}
// Navigation Mapping
const navigationBack = { navigateTo: "/basket" };
const navigationNext = { navigateTo: "/restassure" }; // NOT DONE

// ====
// Page
// ====
const FeedbackWentWrongReasonPage = () => {
  const navigate = useNavigate();
  const [feedbackValue, setFeedbackValue] = useState(null);
  const basketCtx = useContext(BasketContext);
  
  console.log("FeedbackWentWrongReasonPage");

  useEffect(() => {
    const submitFeedback = () => {
      basketCtx.updateDisputeReason(feedbackValue);
      JRSaveConsumerData.saveDispute(feedbackValue).then(() => {
        console.log("submitted feedback");
        navigate(navigationNext.navigateTo);
      });
    };
    feedbackValue && submitFeedback();

  }, [feedbackValue]);

  function feedbackHandler(val) {
    if (!val) {
      navigate(navigationBack.navigateTo);
    } else {
      console.log("consumer selected reason: " + val);

      basketCtx.updateJourney({ key: "FeedbackWentWrongReasonPage", value: val });
      console.log(basketCtx);

      setFeedbackValue(val);
    }    
  }
  
  return (
    <div className="cntBody cntBody--str">
      <div className="logo mb4vh"><img src={customerLogo} alt="logo" /></div>
      <p className="txt40x50 midSpace">
        Your feedback is important to us<br />
        Please let us know what is not right on your basket
      </p>

      <nav className="naviger">
        <div className="navigerButtoms">
          <button className="button button--big button--blue button--tran button--fixHeight" onClick={() => {feedbackHandler(feedbackMapping.WrongProduct)}}>
            Wrong product
          </button>
          <button className="button button--big button--blue button--tran button--fixHeight" onClick={() => {feedbackHandler(feedbackMapping.MissingProduct)}}>
            Missing product<br />
            Things I have aren't listed
          </button>
          <button className="button button--big button--blue button--tran button--fixHeight" onClick={() => {feedbackHandler(feedbackMapping.WrongQuantity)}}>
            Wrong quantity
          </button>
          <button className="button button--big button--blue button--tran button--fixHeight" onClick={() => {feedbackHandler(feedbackMapping.WrongGroupSize)}}>
            Group size is wrong
          </button>
          <button className="button button--big button--blue button--tran button--fixHeight" onClick={() => {feedbackHandler(feedbackMapping.WrongBasket)}}>
            Oops<br />
            That wasn't me buying it
          </button>
        </div>
      </nav>
      <nav className="naviger">
        <div className="navigerButtoms">
          <button className="button button--big button--red button--sizeThird" onClick={() => {feedbackHandler(null)}}>Back</button>
        </div>
      </nav>
    </div>
  );
};

export default FeedbackWentWrongReasonPage;
