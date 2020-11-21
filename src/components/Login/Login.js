import React, { useContext, useState } from "react";
import "./Login.css";
import { Form } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import google from "../../images/resources/Icon/google.png";
import fb from "../../images/resources/Icon/fb.png";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { userContext } from "../../App";

firebase.initializeApp(firebaseConfig);

const Login = () => {

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    success: false,
  })

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };


  const handleGoogleLogIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;

        const signInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true,
        };
        signInUser.error = '';
        signInUser.success = true;
        setUser(signInUser);
        setLoggedInUser(signInUser);
        history.push(from);
      });
  };

  const handleFBLogIn = () => {
  const provider = new firebase.auth.FacebookAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;

        const signInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true,
        };
        signInUser.error = '';
        signInUser.success = true;
        setUser(signInUser);
        setLoggedInUser(signInUser);
        history.push(from);
      });
  };

  const handleInputField = (event) => {
    let isFormValid = true;
    if (event.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const PassHasNum = /\d{1}/.test(event.target.value)
      isFormValid = isPasswordValid && PassHasNum;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

  const handleLogin = (event) => {
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserInfo(user.name);
          history.push("/login")
        })
        .catch(error => {
          const newUserInfo = { ...user }
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo)
        });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {

          const { displayName, email, photoURL } = res.user;

          const signInUser = {
            isSignedIn: true,
            name: displayName,
            email: email,
            photo: photoURL,
            success: true,
          };
          signInUser.error = '';
          signInUser.success = true;
          setUser(signInUser);
          setLoggedInUser(signInUser);
          history.replace(from);
        })
        .catch(error => {
          const newUserInfo = { ...user }
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo)
        });
    }
    event.preventDefault();
  }

  const handleNewUser = () => {
    setNewUser(!newUser)
  };

  const updateUserInfo = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({

      displayName: name,

    }).then(function () {
      console.log('user name updated successfully');
    }).catch(function (error) {
      console.log(error);
    });
  }




  return (
    <div className="">
      <p style={{ textAlign: 'center', color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ textAlign: 'center', color: 'green' }}>Logged in successfully</p>
      }
      <div className="form d-flex align-items-center justify-content-center" >
        <div className=" login-form  tg-form"  >
          <Form >
            <form onSubmit={handleLogin}>
              {!newUser ? <h1 > Login </h1> : <h1>Sign up</h1>}

              {newUser && <div className="input-field" >
                <input className="input form-control"
                  onBlur={handleInputField}
                  type="text"
                  name="name"
                  required
                  placeholder="Name" />
              </div>}

              <div className="input-field" >
                <input className="input form-control"
                  onBlur={handleInputField}
                  type="text"
                  name="email"
                  placeholder="Email"
                  required />
              </div>

              <div className="input-field " >
                <input className=" input form-control"
                  onBlur={handleInputField}
                  type="password"
                  name="password"
                  placeholder="Password"
                  required />
              </div>

              <div className=" bottom-form d-flex justify-content-between align-items-center" >
                <div>
                  <input type="checkbox" />
                  <label style={{ marginLeft: "5px" }}  > Remember me </label>
                </div>

                <Link className="forget-link" to="/" > Forget Password </Link>
              </div>

              <div className="button d-flex justify-content-center" >
                {!newUser ? <input
                  type="submit"
                  className="btn btn-warning tg-primary"

                  value="Log In" /> : <input
                    type="submit"
                    className="btn btn-warning tg-primary"
                    value="Create Account" />}
              </div>

            </form>

          </Form>

          <div className=" button d-flex d-flex align-items-center justify-content-center" >
            {!newUser ? <p >Don 't have an account? </p> : <p >Already have an account? </p>}
            <div>
              {!newUser ? <button className="btn btn-ca" onClick={handleNewUser}><p>Create an account</p></button> : <button className="btn btn-ca" onClick={handleNewUser}><p>
                Sign In</p></button>}
            </div>
          </div>

          <div className="otherOptin  justify-content-center align-items-center" >
            <button onClick={handleGoogleLogIn}
              type="button"
              className="btn btnsingIn btn-secondary" >
              <span className="icon">
                <img style={
                  {width: "35px",height: "35px"}} 
                  src={google}
                  alt="" />
              </span> <span className="" > Sign In with Google </span> </button> 
              <button onClick={
                handleFBLogIn
              } type="button"
                className="btn btnsingIn btn-secondary" >
              <span className="icon" >
                <img style={{width: "35px",height: "35px"}}
                  src={fb}
                  alt="" />
              </span>
              <span className=" " > Sign In with Facebook </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;