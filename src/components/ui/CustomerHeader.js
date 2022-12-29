import "./css/styles.css";
import customerLogo from "./images/logo.png";

function CustomerHeader(props) {
  return (
    <div>
      <header className="header">
        <a href="#" className="logo">
          <img src={customerLogo} alt="Logo" />
        </a>
      </header>
    </div>
  );
}

export default CustomerHeader;
