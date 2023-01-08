import React from "react";

const environmentUrl = 'https://api.sandbox.juxtaretail.com/';
const apiKey = 'UycIBPWoRq8DkLx2euxgv4LmsueVpkSB88K9zu2W';

const jrSaveConsumerData = {
    saveFeedback: jrSaveFeedbackHandler,
    saveReasonNotPurchasing: jrSaveReasonNotPurchasingHandler,
    saveDispute: jrSaveDisputeHandler,
    saveReceiptRequest: jrSaveReceiptRequestHandler
}

const jrFetchDataUrl = {
    saveFeedback: "/j7/checkout/v1/feedback",
    saveReasonNotPurchasing: "/j7/checkout/v1/no-purchase",
    saveDispute: "/j7/checkout/v1/dispute",
    saveReceiptRequest: "/j7/checkout/v1/receipt",
    getSignalRToken: "/j7/checkout/v1/token"    // what is this???
};

const jrSaveFeedbackHandler = (reqBody) => {
    return jrFetchData(jrFetchDataUrl.saveFeedback,reqBody);
}

const jrSaveReasonNotPurchasingHandler = (reqBody) => {
    return jrFetchData(jrFetchDataUrl.saveReasonNotPurchasing,reqBody);
}

const jrSaveDisputeHandler = (reqBody) => {
    return jrFetchData(jrFetchDataUrl.saveDispute,reqBody);
}

const jrSaveReceiptRequestHandler = (reqBody) => {
    return jrFetchData(jrFetchDataUrl.saveReceiptRequest,reqBody);
}

const jrFetchData = (reqUrl, reqBody) => {

    let response = null;

    const url = environmentUrl.concat(reqUrl);

    fetch(url,
        {
          method: 'POST',
          body: JSON.stringify(reqBody),
          headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json'
          }
        }).then(res => {          
          console.log("Fetch data from: " + reqUrl);
          console.log(res);
          console.log(res.ok);
  
          if (res.ok) {
            response = res.json();
          } else {
            response = res.json().then(data => {              
              let errorMessage = 'Authentication Failed';
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }            
              throw new Error(errorMessage);
            });
          }
        })
        .catch((err)=>{          
          alert(err.message);
        })

        return response;
    };

    export default jrSaveConsumerData;

