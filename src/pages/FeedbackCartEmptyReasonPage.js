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
  ProductNotfound: { Value: 1 }, // Did not find the product
  PricesNotExpected: { Value: 2 }, // Prices not as expected
  ChangedMind: { Value: 3 }, // Changed my mind
  StoreNotMeetExpectation: { Value: 4 }, // Store did not meet expectation
};
// Navigation Mapping
const navigationBack = { navigateTo: "/basket" };
const navigationNext = { navigateTo: "/restassure" }; // NOT DONE

// ====
// Page
// ====
const FeedbackCartEmptyReasonPage = () => {
  const navigate = useNavigate();
  const [feedbackValue, setFeedbackValue] = useState(null);
  const basketCtx = useContext(BasketContext);

  console.log("FeedbackCartEmptyReasonPage");

  const jrSaveData = JRSaveConsumerData(basketCtx.sid);

  useEffect(() => {
    const submitFeedback = () => {
      console.log("Submitted no purhcase feedback");

      basketCtx.updateNoPurchaseFeedback(feedbackValue);
      jrSaveData.saveReasonNotPurchasing(feedbackValue);

      navigate(navigationNext.navigateTo);
    };
    feedbackValue && submitFeedback();

  }, [feedbackValue]);

  function feedbackHandler(val) {
    if (!val) {
      navigate(navigationBack.navigateTo);
    } else {
      const selectedReason = val.Value;

      console.log("consumer selected reason: " + selectedReason);

      basketCtx.updateJourney({ key: "FeedbackCartEmptyReasonPage", value: selectedReason });

      setFeedbackValue(selectedReason);
    }    
  }

  return (
    <div className="cntBody cntBody--str">
      <div className="logo mb4vh">
        <img src={customerLogo} alt="logo" />
      </div>
      <p className="txt40x50 midSpace">
        Your opinion matters to us
        <br />
        Please let us know why you did not complete the purchase.
      </p>

      <nav className="naviger">
        <div className="navigerButtoms">
          <button
            className="button button--big button--blue button--tran button--fixHeight"
            onClick={() => {
              feedbackHandler(feedbackMapping.ProductNotfound);
            }}
          >
            I did not find the product
            <br />I was looking for
          </button>
          <button
            className="button button--big button--blue button--tran button--fixHeight"
            onClick={() => {
              feedbackHandler(feedbackMapping.PricesNotExpected);
            }}
          >
            The prices
            <br />
            are not as expected
          </button>
          <button
            className="button button--big button--blue button--tran button--fixHeight"
            onClick={() => {
              feedbackHandler(feedbackMapping.ChangedMind);
            }}
          >
            I've changed my mind
          </button>
          <button
            className="button button--big button--blue button--tran button--fixHeight"
            onClick={() => {
              feedbackHandler(feedbackMapping.StoreNotMeetExpectation);
            }}
          >
            The store did not
            <br />
            meet my expectation
          </button>
        </div>
      </nav>
      <nav className="naviger">
        <div className="navigerButtoms">
          <button
            className="button button--big button--red button--sizeThird"
            onClick={() => {
              feedbackHandler(null);
            }}
          >
            Back
          </button>
        </div>
      </nav>
    </div>
  );
};

export default FeedbackCartEmptyReasonPage;
