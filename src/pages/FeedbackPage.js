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
import JRSaveConsumerData from "../components/fetch/FetchData";

// ================
// Feedback Mapping
// ================
const feedbackMapping = {
  VeryHappy: { Icon: feedbackIcon1, Value: 1 },
  Happy: { Icon: feedbackIcon2, Value: 2 },
  Ok: { Icon: feedbackIcon3, Value: 3 },
  Sad: { Icon: feedbackIcon4, Value: 4 },
  Cry: { Icon: feedbackIcon5, Value: 5 },
}
const navigationSubmitted = { navigateTo: "/home" };

// ====
// Page
// ====
function FeedbackPage() {
  const navigate = useNavigate();
  const [feedbackValue, setFeedbackValue] = useState(null);
  const basketCtx = useContext(BasketContext);

  console.log("FeedbackPage");
  const jrSaveData = JRSaveConsumerData(basketCtx.sid);

  useEffect(() => {
    const submitFeedback = () => {
      console.log("Submitted feedback");

      basketCtx.updateFeedback(feedbackValue);
      jrSaveData.saveFeedback(feedbackValue);

      navigate(navigationSubmitted.navigateTo);
    };
    feedbackValue && submitFeedback();

  }, [feedbackValue]);

  function feedbackHandler(event) {
    const val = event.target.getAttribute("val");
    console.log("consumer selected feedback: " + val);
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
        <button className="gradesBtn" onClick={feedbackHandler}>
          <img src={feedbackMapping.VeryHappy.Icon} alt="Love green face" val={feedbackMapping.VeryHappy.Value} />
        </button>
        <button className="gradesBtn" onClick={feedbackHandler}>
          <img src={feedbackMapping.Happy.Icon} alt="Smile green face" val={feedbackMapping.Happy.Value} />
        </button>
        <button className="gradesBtn" onClick={feedbackHandler}>
          <img src={feedbackMapping.Ok.Icon} alt="ok yellow face" val={feedbackMapping.Ok.Value} />
        </button>
        <button className="gradesBtn" onClick={feedbackHandler}>
          <img src={feedbackMapping.Sad.Icon} alt="sad orange face" val={feedbackMapping.Sad.Value} />
        </button>
        <button className="gradesBtn" onClick={feedbackHandler}>
          <img src={feedbackMapping.Cry.Icon} alt="cry red face" val={feedbackMapping.Cry.Value} />
        </button>
      </div>
      <p className="txt35x43">
        Deliver the ultimate guest experience <br />
        creating delight with every visit
      </p>
    </div>
  );
}

export default FeedbackPage;
