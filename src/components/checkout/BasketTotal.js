import BasketContext from "../store/basket-context";
import { useContext } from "react";

function BasketTotal() {
    const bCtx = useContext(BasketContext);

    console.log('BasketTotal');
    console.log(bCtx);

    return (    
      <div> 
        <h2>Total in Basket:</h2>       
        <p>{bCtx.peopleInGroup}</p>
        <p>{bCtx.totalItems}</p>        
      </div>    
  );
}

export default BasketTotal;
