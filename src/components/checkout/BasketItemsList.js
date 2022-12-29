import React from "react";
import "../ui/css/styles.css";
import BasketLineItem from "./BasketLineItem ";
import BasketLineItemEmpty from "./BasketLineItemEmpty";

//items: [{ code: "", name: "", img: "", quantity: ""}],

function BasketItemsList(props) {
  console.log('BasketItemsList');
  console.log(props);

  function createEmptyLines(lines) {
    const emptyLines = [];
    for (let index = 0; index < lines; index++) {
      emptyLines.push(<BasketLineItemEmpty />);
    }
    return emptyLines.join("");
  }

  return (
    <ul className="listCards">
      {props.items && props.items.length > 0
        ? props.items.map((item) => (
            <BasketLineItem
              key={item.code}
              code={item.code}
              name={item.name}
              img={item.img}
              quantity={item.quantity}
            />
          ))
        : <BasketLineItemEmpty />}  
        
    </ul>
  );
}

export default BasketItemsList;

//createEmptyLines(props.emptyLines || 1)}      