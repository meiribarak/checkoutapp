import React, { useState } from "react";

const DUMMY_BASKET = {
  items: [
    {
      img: "https://us.coca-cola.com/content/dam/nagbrands/us/coke/en/products/coca-cola-original/desktop/coca-cola-original-12oz.jpg?wid=325",
      name: "Coke Can",
      code: "123",
      quantity: "2",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF8TCne_TOJzZy3BVCiRQVKwWB3n15DjJa1g&usqp=CAU",
      name: "Coke Bottle",
      code: "222",
      quantity: "1",
    },
  ],
  totalItems: 3,
  peopleInGroup: 1,
};

const defaultTotalItems = 1;
const defaultPeopleInGroup = 1;

const BasketContext = React.createContext({
  storeid: null,
  sid: null,
  basket: {
    items: [],
    totalItems: defaultTotalItems,
    peopleInGroup: defaultPeopleInGroup,
  },
  dispute: {
    raised: false,
    reason: "",
  },
  ContactDetails: {
    email: "",
    phonenumber: "",
  },
  feedback: "",
  journeyHistory: [], // key value of page/button and what user selected, for tracking capabilities
  updateBasket: (basket) => {},
  setSessionId: (sid) => {},
  getSessionId: () => {},
  hasBasket: () => {},
  getBasketItems: () => {},
  getTotalItems: () => {},
  getPeopleInGroup: () => {},
  updateJourney: (step) => {},
  hasDisputeRaised: () => {},
  updateDisputeReason: (reason) => {},
  updateFeedback: (feedback) => {},
  updateContactDetails: (phonenumber) => {},
  updateDummyBasket: () => {},
});

export function BasketContextProvider(props) {
  const [consumerBasket, setBasket] = useState({});
  const [consumerDispute, setDispute] = useState({});
  const [consumerContactDetails, setContactDetails] = useState("");
  const [consumerFeedback, setFeedback] = useState("");

  // Session ID
  function setSessionIdHandler(sid) {
    consumerBasket.sid = sid;
    return consumerBasket;
  }

  // Basket
  function updateConsumerBasketHandler(basket) {
    setBasket((prevBasket) => {
      return (prevBasket = basket);
    });
  }

  function hasBasketHandler() {
    return consumerBasket && consumerBasket.items;
  }

  function getBasketItemsHandler() {
    return hasBasketHandler() ? consumerBasket.basket.items : [];
  }

  function getTotalItemsHandler() {
    const totalItems = consumerBasket.basket.totalItems;
    return hasBasketHandler() && totalItems ? totalItems : defaultTotalItems;
  }

  function getPeopleInGroupHandler() {
    const peopleInGroup = consumerBasket.basket.peopleInGroup;
    return hasBasketHandler() && peopleInGroup
      ? peopleInGroup
      : defaultPeopleInGroup;
  }

  // Consumer Checkout Journey
  function updateJourneyHandler(step) {
    if (!consumerBasket.updateJourney) consumerBasket.updateJourney = [];
    console.log("updateJourneyHandler");
    console.log(step);
    console.log(consumerBasket.journeyHistory);
    return consumerBasket.journeyHistory.push(step);
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
    setFeedback((prevFeedback) => {
      return (prevFeedback = cFeedback);
    });
    return consumerFeedback;
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
    storeid: null,
    sid: consumerBasket.sid,
    basket: {
      items: consumerBasket.items,
      totalItems: consumerBasket.totalItems,
      peopleInGroup: consumerBasket.peopleInGroup,
    },
    dispute: {
      raised: consumerDispute.raised,
      reason: consumerDispute.reason,
    },
    ContactDetails: {
      email: "",
      phonenumber: consumerContactDetails,
    },
    feedback: consumerFeedback,
    journeyHistory: consumerBasket.updateJourney,
    updateBasket: (basket) => updateConsumerBasketHandler,
    setSessionId: (sid) => setSessionIdHandler,
    getSessionId: () => {
      return consumerBasket.sid;
    },
    hasBasket: () => hasBasketHandler,
    getBasketItems: () => getBasketItemsHandler,
    getTotalItems: () => getTotalItemsHandler,
    getPeopleInGroup: () => getPeopleInGroupHandler,
    updateJourney: (step) => updateJourneyHandler,
    hasDisputeRaised: () => {
      return consumerDispute.raised;
    },
    updateDisputeReason: (reason) => updateDisputeReasonHandler,
    updateFeedback: (feedback) => updateConsumerFeedbackHandler,
    updateContactDetails: (phonenumber) => updateConsumerContactDetailsHandler,
    updateDummyBasket: () => {
      updateConsumerBasketHandler(DUMMY_BASKET);
    },
  };

  return (
    <BasketContext.Provider value={context}>
      {props.children}
    </BasketContext.Provider>
  );
}

export default BasketContext;
