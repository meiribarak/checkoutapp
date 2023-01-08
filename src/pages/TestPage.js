import "./../components/ui/css/styles.css";
import classes from "./../components/auth/AuthForm.module.css";
import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../components/store/auth-context";
import BasketContext from "../components/store/basket-context";

const juxtalogo = "https://www.juxta.ai/build/img/logo.svg";

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

    const currentTime = new Date(new Date().getTime() + 12).getTime();
    
    if (isTestingDataInjected) {
      //authCtx.logout();

      //console.log("load test data");
      //authCtx.login(tempToken, currentTime, tempToken); // (token, expirationTime, refreshToken)
      //console.log(authCtx);

      //basketCtx.updateDummyBasket();
      //console.log(basketCtx);

      //navigate("/basket");
    }
  }, [
    basketCtx,
    authCtx,
    isTestingDataInjected,
    navigate
  ]);

  function startTestingHandler() {
    console.log("click");
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
