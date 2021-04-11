import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import firebase from "firebase/app";
import "firebase/auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ToastProvider } from "react-toast-notifications";

// components
import Home from "./components/Home";
import NewComplaint from "./components/NewComplaint";
import VpsChat from "./components/VpsChat";
import ComplaintStatus from "./components/ComplaintStatus";
import SignUp from "./components/Signup";
import SignIn from "./components/Login";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Admin from "./components/Admin";
import CharCert from "./components/CharCert";
import ApplyNoc from "./components/ApplyNoc";
import Profile from "./components/Profile";
import PastIncidents from "./components/PastIncidents";
import NotFound from "./components/notfound";
import Unauthorized from "./components/unauthorized";

// initialize firebase
const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const App = (props) => {
  const [user, setUser] = useState("");
  const [isAuth, setIsAuth] = useState("true");
  console.log("App.js called");
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      if (user) setIsAuth("true");
      else setIsAuth("false");
    });
  }, []);
  console.log(isAuth);
  if (isAuth === "true") {
    return (
      <Router>
        <NavBar />
        <Switch>
          <ToastProvider>
            <Route exact path="/" component={Home} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/u/:uid/home" component={Home} />
            <Route exact path="/u/:uid/my-profile" component={Profile} />
            <Route
              exact
              path="/u/:uid/new-complaint"
              component={NewComplaint}
            />
            <Route exact path="/u/:uid/complaint-status">
              <ComplaintStatus user={user} />
            </Route>
            <Route
              exact
              path="/u/:uid/past-incidents"
              component={PastIncidents}
            />
            <Route exact path="/u/:uid/apply-noc" component={ApplyNoc} />
            <Route exact path="/u/:uid/vps-chat" component={VpsChat} />
            <Route exact path="/u/:uid/admin" component={Admin} />
            <Route
              exact
              path="/u/:uid/character-certificate"
              component={CharCert}
            />
          </ToastProvider>
        </Switch>
        <Footer />
      </Router>
    );
  } else if (isAuth === "false") {
    return (
      <Router>
        <NavBar />
        <ToastProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route
              exact
              path="/u/:uid/new-complaint"
              component={Unauthorized}
            />
            <Route
              exact
              path="/u/:uid/complaint-status"
              component={Unauthorized}
            />
            <Route
              exact
              path="/u/:uid/past-incidents"
              component={Unauthorized}
            />
            <Route exact path="/u/:uid/apply-noc" component={Unauthorized} />
            <Route exact path="/u/:uid/vps-chat" component={Unauthorized} />
            <Route
              exact
              path="/u/:uid/character-certificate"
              component={Unauthorized}
            />
            <Route component={NotFound} />
          </Switch>
        </ToastProvider>
        <Footer />
      </Router>
    );
  }
};

export default App;
