import React from "react";
import "./../components/ui/css/styles.css";
import CustomerLogo from "../components/ui/CustomerLogo";

function ThankYouPage() {
  return (
    <div className="fullBlock">
      <CustomerLogo/>
      <p className="txt40x50 upSpace">
        Thank you for shoping with us! <br />
        Come again
      </p>
    </div>
  );
}

export default ThankYouPage;
