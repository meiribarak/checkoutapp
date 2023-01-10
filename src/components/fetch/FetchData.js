import React, { useContext } from "react";
import AuthContext from "../store/auth-context";
import BasketContext from "../store/basket-context";

const devEnvironmentUrl = "https://api.dev.juxtaretail.com";
const sandboxEnvironmentUrl = "https://api.sandbox.juxtaretail.com";
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

const JRSaveConsumerData = (sessionId) => {
  const authCtx = useContext(AuthContext);
  const environmentUrl = devEnvironmentUrl;

  const jrFetchData = (reqUrl, reqBody) => {
    
    const url = environmentUrl.concat(reqUrl);

    reqBody.storeId = authCtx.storeId;
    reqBody.sessionId = sessionId;

    console.log("JRFetchData: ", reqUrl, reqBody);

    let res = null;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        Authorization: "Bearer " + authCtx.token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("Fetch data from: ", reqUrl);
        console.log("res", res);        

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

  const jrSaveFeedbackHandler = (feedbackCode) => {
    console.log("jrSaveFeedbackHandler", feedbackCode);
    jrSaveDataBodyTemplate.code = feedbackCode;
    return jrFetchData(jrFetchDataUrl.saveFeedback, jrSaveDataBodyTemplate);
  };

  const jrSaveReasonNotPurchasingHandler = (noPurchaseCode) => {
    jrSaveDataBodyTemplate.code = noPurchaseCode;
    return jrFetchData(
      jrFetchDataUrl.saveReasonNotPurchasing,
      jrSaveDataBodyTemplate
    );
  };

  const jrSaveDisputeHandler = (issueCode) => {
    jrSaveDataBodyTemplate.code = issueCode;
    return jrFetchData(jrFetchDataUrl.saveDispute, jrSaveDataBodyTemplate);
  };

  const jrSaveReceiptRequestHandler = (phoneNumber) => {
    return jrFetchData(jrFetchDataUrl.saveReceiptRequest, {
      storeId: "",
      sessionId: "",
      phone: phoneNumber,
    });
  };

  return {
    saveFeedback: jrSaveFeedbackHandler,
    saveReasonNotPurchasing: jrSaveReasonNotPurchasingHandler,
    saveDispute: jrSaveDisputeHandler,
    saveReceiptRequest: jrSaveReceiptRequestHandler,
  };
};

export default JRSaveConsumerData;
