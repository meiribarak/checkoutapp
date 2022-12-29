import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./../components/ui/css/style.css";
import feedbackIcon1 from "./../components/ui/images/5_Risorsa 5.svg"; // Love green face
import feedbackIcon2 from "./../components/ui/images/4_Risorsa 4.svg"; // Smile green face
import feedbackIcon3 from "./../components/ui/images/3_Risorsa 3.svg"; // ok yellow face
import feedbackIcon4 from "./../components/ui/images/2_Risorsa 2.svg"; // sad orange face
import feedbackIcon5 from "./../components/ui/images/1_Risorsa 1.svg"; // Cry red face
import CustomerLogo from "../components/ui/CustomerLogo";
import BasketContext from "../components/store/basket-context";

function FeedbackPage() {
  const navigate = useNavigate();
  const [feedbackValue, setFeedbackValue] = useState(null);
  const basketCtx = useContext(BasketContext);

  useEffect(() => {
    const submitFeedback = () => {
      fetch(
        "https://react-meetups-a43aa-default-rtdb.europe-west1.firebasedatabase.app/meetups.json"
      )
        .then((response) => {
          console.log("submitted feedback");
          return response.json();
        })
        .then((data) => {
          console.log("navigate to home");
          navigate("/home");
        });
    };
    feedbackValue && submitFeedback();

  }, [feedbackValue]);

  function feedbackHandler(event) {    
    const val = event.target.getAttribute("val");
    console.log("consumer selected feedback: " + val);

    basketCtx.addConsumerStateToContext({ key: "FeedbackPage", value: val });
    console.log(basketCtx);

    setFeedbackValue(val);
  }

  return (
    <div className="fullBlock">
      <CustomerLogo />
      <p className="txt40x50 midSpace">
        Deliver the ultimate guest experience <br />
        creating delight with every visit
      </p>
      <div className="grades">
        <button className="gradesBtn" onClick={feedbackHandler} ><img src={feedbackIcon1} alt="Love green face" val="1"/></button>
        <button className="gradesBtn" onClick={feedbackHandler} ><img src={feedbackIcon2} alt="Smile green face" val="2"/></button>
        <button className="gradesBtn" onClick={feedbackHandler} ><img src={feedbackIcon3} alt="ok yellow face" val="3"/></button>
        <button className="gradesBtn" onClick={feedbackHandler} ><img src={feedbackIcon4} alt="sad orange face" val="4"/></button>
        <button className="gradesBtn" onClick={feedbackHandler} ><img src={feedbackIcon5} alt="cry red face" val="5"/></button>
      </div>
      <p className="txt35x43">
        Deliver the ultimate guest experience <br />
        creating delight with every visit
      </p>
    </div>
  );
}

export default FeedbackPage;
