import React from "react";
import "../ui/css/styles.css";


//items: [{ code: "", name: "", img: "", quantity: ""}],

function BasketLineItem(props) {
  return (           
      <li className="listCards__item">
        <div className="listCards__img"><img src={props.img} alt={props.name} /></div>
        <div className="listCards__cnt">
          <p className="listCards__name txt30x30">{props.name}</p>
          <p className="listCards__indef txt20x22">Ref. {props.code}</p>
        </div>
        <p className="listCards__count txt48x50">{props.quantity}</p>
      </li>   
  );
}

export default BasketLineItem;
