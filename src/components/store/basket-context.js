import React, { useState } from "react";

const defaultTotalItems = 1;
const defaultPeopleInGroup = 1;

const BasketContext = React.createContext({  
  sid: null, 
  basket: {
    items: [],
    totalItems: defaultTotalItems,
    peopleInGroup: defaultPeopleInGroup,
  },/*
  dispute: {
    raised: false,
    reason: "",
  },
  ContactDetails: {
    email: "",
    phonenumber: "",
  },*/
  feedback: "",
  journeyHistory: [], // key value of page/button and what user selected, for tracking capabilities   
  updateSessionId: (sid) => {},  
  updateBasket: (basket) => {},  
  hasBasket: () => {},
  updateJourney: (step) => {},/*
  hasDisputeRaised: () => {},
  updateDisputeReason: (reason) => {},
  updateFeedback: (feedback) => {},
  updateContactDetails: (phonenumber) => {},*/  
});

export function BasketContextProvider(props) {  
  const [consumerSessionId, setSessionId] = useState("");
  const [consumerBasket, setBasket] = useState({});
  const [consumerJourney, setJourney] = useState([]);
  const [consumerDispute, setDispute] = useState({});
  const [consumerContactDetails, setContactDetails] = useState("");
  const [consumerFeedback, setFeedback] = useState("");
  
  // Session ID
  const updateSessionIdHandler = (sid) => {
    setSessionId(sid);    
  }  

  // Basket
  const updateConsumerBasketHandler = (basket) => {
    console.log("update basket: ", basket);
    setBasket((prevBasket) => {
      return (prevBasket = basket);
    });
  }

  const hasConsumerBasketHandler = () => {
    return !!consumerBasket && !!consumerBasket.items;
  }  

  // Consumer Checkout Journey
  function updateJourneyHandler(step) {
    if (!consumerJourney) setJourney([]);
    console.log("Update Consumer Journey: ", consumerJourney);
    consumerJourney.push(step);
  }

  // Dispute
  function updateDisputeReasonHandler(reason) {
    setDispute((prevDispute) => {
      prevDispute = {
        raised: true,
        reason: reason,
      };
    });
    return consumerDispute;
  }

  // Feedback
  function updateConsumerFeedbackHandler(cFeedback) {
    setFeedback(cFeedback);
  }

  // Contact Details
  function updateConsumerContactDetailsHandler(phonenumber) {
    setContactDetails((prevDetails) => {
      return (prevDetails = phonenumber);
    });
    return consumerContactDetails;
  }

  // Context
  const context = {    
    sid: consumerSessionId,    
    basket: {
      items: consumerBasket.items,
      totalItems: consumerBasket.totalItems,
      peopleInGroup: consumerBasket.peopleInGroup,
    },
    /*
    dispute: {
      raised: consumerDispute.raised,
      reason: consumerDispute.reason,
    },
    ContactDetails: {
      email: "",
      phonenumber: consumerContactDetails,
    },*/
    feedback: consumerFeedback,
    journeyHistory: consumerJourney,     
    
    // Session Handlers
    updateSessionId: updateSessionIdHandler,
    
    // Basket handlers    
    updateBasket: updateConsumerBasketHandler,
    hasBasket: hasConsumerBasketHandler,
    updateJourney: updateJourneyHandler,
    updateFeedback: updateConsumerFeedbackHandler,
    /* hasDisputeRaised: () => {
      return consumerDispute.raised;
    },
    updateDisputeReason: (reason) => updateDisputeReasonHandler,
    
    updateContactDetails: (phonenumber) => updateConsumerContactDetailsHandler,*/    
  };

  return (
    <BasketContext.Provider value={context}>
      {props.children}
    </BasketContext.Provider>
  );
}

export default BasketContext;
