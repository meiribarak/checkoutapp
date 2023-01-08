import React, { useContext, useState } from "react";
import "./../components/ui/css/styles.css";
import CustomerHeader from "../components/ui/CustomerHeader";
import BasketItemsList from "../components/checkout/BasketItemsList";
import BasketContext from "../components/store/basket-context";
import { useNavigate } from "react-router-dom";
import clearIcon from "../components/ui/images/clear.png";
import telIcon from "../components/ui/images/tel.png";

function PhoneNumberPage() {
  const basketCtx = useContext(BasketContext);
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const isShowTrustMeButton = false;

  const navigateToFeedback = { response: "TrustYou", page: "/feedback" };
  const navigateToBasket = { response: "Back", page: "/basket" };
  const navigateToRestAssure = { response: "Confirm", page: "/feedback" };

  console.log("PhoneNumberPage");
  console.log(basketCtx);

  function actionHandler(navigateTo) {
    basketCtx.updateJourney({
      key: "PhoneNumberPage",
      value: phoneNumber,
    });
    basketCtx.updateJourney({
      key: "PhoneNumberPage",
      value: navigateTo.response,
    });
    console.log("navigate to " + navigateTo.page);
    navigate(navigateTo.page);
  }

  function addDigitToPhoneNumber(event) {
    setPhoneNumber((prevPhoneNumber) => {
      return prevPhoneNumber.concat(event.target.innerHTML);
    });
  }

  function removeDigitToPhoneNumber() {
    setPhoneNumber((prevPhoneNumber) => {
      return prevPhoneNumber.slice(0, -1);
    });
  }

  return (
    <div>
      <CustomerHeader />
      <main className="phoneBody">
        <p className="txt40x50">
          Please provide us a phone number where we <br />
          can send you the details of you purchase
        </p>
        <div className="phoneBlock">
          <div className="inputBox">
            <div className="inputBox__icon">
              <img src={telIcon} className="iconTel" alt="tel icon" />
            </div>
            <input type="text" defaultValue={phoneNumber} />
          </div>
          <ul className="phoneNums">
            <li className="phoneNums__item">
              <button
                className="phoneNums__btn buttonFil"
                onClick={addDigitToPhoneNumber}
              >
                1
              </button>
            </li>
            <li className="phoneNums__item">
              <button
                className="phoneNums__btn buttonFil"
                onClick={addDigitToPhoneNumber}
              >
                2
              </button>
            </li>
            <li className="phoneNums__item">
              <button
                className="phoneNums__btn buttonFil"
                onClick={addDigitToPhoneNumber}
              >
                3
              </button>
            </li>
            <li className="phoneNums__item">
              <button
                className="phoneNums__btn buttonFil"
                onClick={addDigitToPhoneNumber}
              >
                4
              </button>
            </li>
            <li className="phoneNums__item">
              <button
                className="phoneNums__btn buttonFil"
                onClick={addDigitToPhoneNumber}
              >
                5
              </button>
            </li>
            <li className="phoneNums__item">
              <button
                className="phoneNums__btn buttonFil"
                onClick={addDigitToPhoneNumber}
              >
                6
              </button>
            </li>
            <li className="phoneNums__item">
              <button
                className="phoneNums__btn buttonFil"
                onClick={addDigitToPhoneNumber}
              >
                7
              </button>
            </li>
            <li className="phoneNums__item">
              <button
                className="phoneNums__btn buttonFil"
                onClick={addDigitToPhoneNumber}
              >
                8
              </button>
            </li>
            <li className="phoneNums__item">
              <button
                className="phoneNums__btn buttonFil"
                onClick={addDigitToPhoneNumber}
              >
                9
              </button>
            </li>
            <li className="phoneNums__item">
              <button
                className="phoneNums__btn buttonFil"
                onClick={addDigitToPhoneNumber}
              >
                +
              </button>
            </li>
            <li className="phoneNums__item">
              <button
                className="phoneNums__btn buttonFil"
                onClick={addDigitToPhoneNumber}
              >
                0
              </button>
            </li>
            <li className="phoneNums__item">
              <button
                className="phoneNums__btn buttonFil"
                onClick={removeDigitToPhoneNumber}
              >
                <img src={clearIcon} className="iconRemuve" alt="clear icon" />
              </button>
            </li>
          </ul>
        </div>
        <p className="txt25x25">
          Disclaimer we do not use your mobile phone for commercial use
        </p>
        <nav className="naviger">
          <div className="navigerButtoms">
            <button
              className="button button--min button--red button--fixHeight"
              onClick={() => {
                actionHandler(navigateToBasket);
              }}
            >
              Back
            </button>
            <button
              className="button button--min button--fixHeight"
              onClick={() => {
                actionHandler(navigateToRestAssure);
              }}
            >
              Confirm
            </button>
            <button className="button button--min button--empty button--fixHeight"></button>
            {isShowTrustMeButton && (
              <button
                className="button button--min button--tran button--fixHeight"
                onClick={() => {
                  actionHandler(navigateToFeedback);
                }}
              >
                I trust you <br />
                no receipt for me
              </button>
            )}
          </div>
        </nav>
      </main>
    </div>
  );
}

export default PhoneNumberPage;
