import { useState, useRef, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import classes from './AuthForm.module.css';
import AuthContext from '../store/auth-context';

const juxtalogo = "https://www.juxta.ai/build/img/logo.svg";

// URL + Key for JR ---------------------------------------
const environmentUrl = 'https://api.sandbox.juxtaretail.com/';
const apiUrl = 'j5/oauth/token';
const apiKey = 'UycIBPWoRq8DkLx2euxgv4LmsueVpkSB88K9zu2W';

const tempUserName = 'EPSTest';
const tempPassword = 'abcdefghil';
// --------------------------------------------------------

const AuthForm = () => {
  const navigate = useNavigate();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredUser = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);

    //const corsProxy = 'https://cors-anywhere.herokuapp.com/';
    //const authUrl = corsProxy.concat(environmentUrl, apiUrl);   // to fix after adding to server CORS!!! 
      
    const authUrl = environmentUrl.concat(apiUrl);
    
    fetch(authUrl,
      {
        method: 'POST',
        body: JSON.stringify({
          username: enteredUser,
          password: enteredPassword
        }),
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json'
        }
      }).then(res => {
        setIsLoading(false);

        console.log("Login Result");
        console.log(res);
        console.log(res.ok);

        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(data => {
            
            let errorMessage = 'Authentication Failed';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }            
            throw new Error(errorMessage);
          });
        }
      }).then(data => {
        console.log('login successfully!');

        navigate("/");
      })
      .catch((err)=>{
        setIsLoading(false);
        alert(err.message);
      })
  };

  return (
    <section className={classes.auth}>
      <img src={juxtalogo} alt="logo" />
      <br/><br/>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' required ref={usernameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>Login</button>}
          {isLoading && "Sending Request..."}          
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
