import "./css/styles.css";
import customerLogo from "./images/logo.png";

function CustomerLogo() {
  return (
    <div className="logo">
      <img src={customerLogo} alt="Logo" />
    </div>
  );
}

export default CustomerLogo;
