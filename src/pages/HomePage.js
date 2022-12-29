import React from "react";
import "./../components/ui/css/styles.css";
import CustomerLogo from "../components/ui/CustomerLogo";

function HomePage() {
  return (
    <div className="fullBlock fullBlock--blue">
      <CustomerLogo/>
      <p className="txt40x50 upSpace">
        Deliver the ultimate guest experience <br />
        creating delight with every visit
      </p>
    </div>
  );
}

export default HomePage;
