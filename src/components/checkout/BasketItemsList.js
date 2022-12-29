import React from "react";
import "../ui/css/styles.css";
import BasketLineItem from "./BasketLineItem ";

//items: [{ code: "", name: "", img: "", quantity: ""}],

function BasketItemsList(props) {
  return (
    <ul className="listCards">
      {props.items.map((item) => (
        <BasketLineItem
          key={item.code}
          code={item.code}
          name={item.name}
          img={item.img}
          quantity={item.quantity}
        />
      ))}
    </ul>
  );
}

export default BasketItemsList;
