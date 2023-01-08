import "./../components/ui/css/styles.css";
import classes from "./../components/auth/AuthForm.module.css";
import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../components/store/auth-context";
import BasketContext from "../components/store/basket-context";

const juxtalogo = "https://www.juxta.ai/build/img/logo.svg";

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


const TestPage = () => {
  const navigate = useNavigate();
  const [isTestingDataInjected, setTestingDate] = useState(false);

  const authCtx = useContext(AuthContext);
  const basketCtx = useContext(BasketContext);

  const tokenInputRef = useRef();
  const sessionIdInputRef = useRef();
  const storeIdInputRef = useRef();

  console.log("TestPage");

  
  useEffect(() => {

    if (isTestingDataInjected) {
      const currentTime = new Date(new Date().getTime() + 12).getTime();

      authCtx.logout();

      const tempToken = tokenInputRef.current.value;
      authCtx.login(tempToken, currentTime, tempToken, storeIdInputRef.current.value); // (token, expirationTime, refreshToken, storeId)

      basketCtx.updateSessionId(sessionIdInputRef.current.value);
      basketCtx.updateBasket(DUMMY_BASKET);

      
      navigate("/basket");
    }
  }, [ isTestingDataInjected, authCtx, basketCtx, navigate ]);

  function startTestingHandler() {
    setTestingDate(true);
  }

  return (
    <section className={classes.auth}>
      <img src={juxtalogo} alt="logo" />
      <br />
      <br />
      <h1>Start Shoping Test</h1>
      <div>
        <div className={classes.control}>
          <label htmlFor="token">Token</label>
          <input type="text" id="token" required ref={tokenInputRef} defaultValue="99999"></input>
        </div>
        <div className={classes.control}>
          <label htmlFor="sid">Session Id</label>
          <input type="text" id="sid" required ref={sessionIdInputRef} defaultValue="67"></input>
        </div>
        <div className={classes.control}>
          <label htmlFor="storeid">Store Id</label>
          <input type="text" id="storeid" required ref={storeIdInputRef} defaultValue="51"></input>
        </div>
        <div className={classes.actions}>
          <button onClick={startTestingHandler}>Start</button>
        </div>
      </div>
    </section>
  );
};

export default TestPage;
