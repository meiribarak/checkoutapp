import React, { useContext } from "react";
import AuthContext from "../store/auth-context";
import BasketContext from "../store/basket-context";

const environmentUrl = "https://api.sandbox.juxtaretail.com/";
const apiKey = "UycIBPWoRq8DkLx2euxgv4LmsueVpkSB88K9zu2W";

const jrFetchDataUrl = {
  saveFeedback: "/j7/checkout/v1/feedback",
  saveReasonNotPurchasing: "/j7/checkout/v1/no-purchase",
  saveDispute: "/j7/checkout/v1/dispute",
  saveReceiptRequest: "/j7/checkout/v1/receipt",
  getSignalRToken: "/j7/checkout/v1/token", // what is this???
};

const jrSaveDataBodyTemplate = {
  storeId: "",
  sessionId: "",
  code: "",
};

const jrSaveFeedbackHandler = (feedbackCode) => {
  jrSaveDataBodyTemplate.code = feedbackCode;
  return JRFetchData(jrFetchDataUrl.saveFeedback, jrSaveDataBodyTemplate);
};

const jrSaveReasonNotPurchasingHandler = (noPurchaseCode) => {
  jrSaveDataBodyTemplate.code = noPurchaseCode;
  return JRFetchData(
    jrFetchDataUrl.saveReasonNotPurchasing,
    jrSaveDataBodyTemplate
  );
};

const jrSaveDisputeHandler = (issueCode) => {
  jrSaveDataBodyTemplate.code = issueCode;
  return JRFetchData(jrFetchDataUrl.saveDispute, jrSaveDataBodyTemplate);
};

const jrSaveReceiptRequestHandler = (phoneNumber) => {
  return JRFetchData(jrFetchDataUrl.saveReceiptRequest, {
    storeId: "",
    sessionId: "",
    phone: phoneNumber,
  });
};

const JRSaveConsumerData = {
  saveFeedback: jrSaveFeedbackHandler,
  saveReasonNotPurchasing: jrSaveReasonNotPurchasingHandler,
  saveDispute: jrSaveDisputeHandler,
  saveReceiptRequest: jrSaveReceiptRequestHandler,
};


const JRFetchData = (reqUrl, reqBody) => {
  const authCtx = useContext(AuthContext);
  const basketCtx = useContext(BasketContext);
  const url = environmentUrl.concat(reqUrl);

  reqBody.storeId = basketCtx.storeid;
  reqBody.sessionId = basketCtx.sid;

  let res = null;
  fetch(url, {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("Fetch data from: " + reqUrl);
      console.log(res);
      console.log(res.ok);

      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          let errorMessage = "Authentication Failed";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        });
      }
    })
    .catch((err) => {
      alert(err.message);
      return res.json();
    });
};

export default JRSaveConsumerData;
