import { createContext, useState } from "react";

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

const BasketContext = createContext({
  items: [],
  totalItems: defaultTotalItems,
  peopleInGroup: defaultPeopleInGroup,
  consumerState: [], // key value of page/button and what user selected, for tracking capabilities
  updateBasket: (basket) => {},
  hasBasket: () => {},
  getBasketItems: () => {},
  getTotalItems: () => {},
  getPeopleInGroup: () => {},
  addConsumerStateToContext: (cState) => {},
  updateDummyBasket: () => {},
});

export function BasketContextProvider(props) {
  const [consumerBasket, setConsumerBasket] = useState({});

  function updateConsumerBasketHandler(basket) {
    setConsumerBasket((prevBasket) => {
      return (prevBasket = basket);
    });
  }

  function hasBasketHandler() {
    return consumerBasket && consumerBasket.items;
  }

  function getBasketItemsHandler() {
    return hasBasketHandler() ? consumerBasket.items : [];
  }

  function getTotalItemsHandler() {
    return hasBasketHandler() && consumerBasket.totalItems
      ? consumerBasket.totalItems
      : defaultTotalItems;
  }

  function getPeopleInGroupHandler() {
    return hasBasketHandler() && consumerBasket.peopleInGroup
      ? consumerBasket.peopleInGroup
      : defaultPeopleInGroup;
  }

  function updateConsumerStateHandler(cState) {
    if (!consumerBasket.consumerState) consumerBasket.consumerState = [];
    console.log("updateConsumerStateHandler");
    console.log(cState);
    console.log(consumerBasket.consumerState);
    return consumerBasket.consumerState.push(cState);
  }

  const context = {
    items: consumerBasket.items,
    totalItems: consumerBasket.totalItems,
    peopleInGroup: consumerBasket.peopleInGroup,
    consumerState: consumerBasket.consumerState,
    updateBasket: updateConsumerBasketHandler,
    hasBasket: hasBasketHandler,
    getBasketItems: getBasketItemsHandler,
    getTotalItems: getTotalItemsHandler,
    getPeopleInGroup: getPeopleInGroupHandler,
    addConsumerStateToContext: updateConsumerStateHandler,
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
