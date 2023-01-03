import "./css/styles.css";
import storeIcon from "./images/store.png"; // icon type: "store"
import cryCartIcon from "./images/cart.png"; // icon type: "cart"

function BuddyLogo(props) {
  const altText = props.alt;
  const iconType = props.icon === "cart" ? cryCartIcon : storeIcon;

  return (
    <div className="cartIco">
      <img src={iconType} alt={altText} />
    </div>
  );
}

export default BuddyLogo;
