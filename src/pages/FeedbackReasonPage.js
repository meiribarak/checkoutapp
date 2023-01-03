import "./../components/ui/css/styles.css";
import customerLogo from "../components/ui/images/logo.png";

const FeedbackReasonPage = () => {
  return (
    <div className="cntBody cntBody--str">
      <div className="logo mb4vh"><img src={customerLogo} alt="logo" /></div>
      <p className="txt40x50 midSpace">
        Your feedback is important to us<br />
        Please let us know what is not right on your basket
      </p>

      <nav className="naviger">
        <div className="navigerButtoms">
          <button className="button button--big button--blue button--tran button--fixHeight">
            Wrong product
          </button>
          <button className="button button--big button--blue button--tran button--fixHeight">
            Missing product<br />
            Things I have aren't listed
          </button>
          <button className="button button--big button--blue button--tran button--fixHeight">
            Wrong quantity
          </button>
          <button className="button button--big button--blue button--tran button--fixHeight">
            Group size is wrong
          </button>
          <button className="button button--big button--blue button--tran button--fixHeight">
            Oops<br />
            That wasn't me buying it
          </button>
        </div>
      </nav>
      <nav className="naviger">
        <div className="navigerButtoms">
          <button className="button button--big button--red button--sizeThird">Back</button>
        </div>
      </nav>
    </div>
  );
};

export default FeedbackReasonPage;
