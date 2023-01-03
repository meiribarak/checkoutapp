import React from "react";
import "./../components/ui/css/style.css";
import logo from "./../components/ui/images/site-logo-blue.jpg";

function HomePage2() {
  return (
    <div className="page-wrapper h-100 bg-blue">                
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
                    <h1 className="text-center">Deliver the ultimate guest experience creating delight with every visit</h1>
                </div>                
            </div>
        </div>
    </div>
  );
}

export default HomePage2;
