import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./../components/ui/css/style.css";
import logo from "./../components/ui/images/site-logo.jpg";
import feedbackIcon1 from "./../components/ui/images/5_Risorsa 5.svg"; // Love green face
import feedbackIcon2 from "./../components/ui/images/4_Risorsa 4.svg"; // Smile green face
import feedbackIcon3 from "./../components/ui/images/3_Risorsa 3.svg"; // ok yellow face
import feedbackIcon4 from "./../components/ui/images/2_Risorsa 2.svg"; // sad orange face
import feedbackIcon5 from "./../components/ui/images/1_Risorsa 1.svg"; // Cry red face

function FeedbackPage2() {
  const navigate = useNavigate();
  const [feedbackValue, setFeedbackValue] = useState(null);

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
    setFeedbackValue(val);
  }

  return (
    <div className="page-wrapper h-100">
      <header className="site-header">
        <div className="wrapper">
          <div className="site-logo text-center">
            <img src={logo} alt="Logo" />
          </div>
        </div>
      </header>
      <div className="site-content">
        <div className="wrapper wrapper-medium">
          <div className="section-header">
            <h1 className="text-center">
              Thank you for shopping wit us!{" "}
              <span className="d-block">Come again!</span>
            </h1>
          </div>
          <div className="section-summary section-shopping font-36 text-center">
            <div className="shopping-icon-lists">
              <div className="shopping-icon-lists d-flex justify-content-center">
                <div className="shopping-icon-list" onClick={feedbackHandler}>
                  <img src={feedbackIcon1} alt="Icon 1" val="1" />
                </div>
                <div className="shopping-icon-list" onClick={feedbackHandler}>
                  <img src={feedbackIcon2} alt="Icon 2" val="2" />
                </div>
                <div className="shopping-icon-list" onClick={feedbackHandler}>
                  <img src={feedbackIcon3} alt="Icon 3" val="3" />
                </div>
                <div className="shopping-icon-list" onClick={feedbackHandler}>
                  <img src={feedbackIcon4} alt="Icon 4" val="4" />
                </div>
                <div className="shopping-icon-list" onClick={feedbackHandler}>
                  <img src={feedbackIcon5} alt="Icon 5" val="5" />
                </div>
              </div>
              <p>
                Your opinion matters to us.
                <br />
                Please rate your experience shopping with us
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackPage2;
