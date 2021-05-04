import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import AdminChat from "./components/AdminChat";
import NotFound from "./components/notfound";
import UnAuthorized from "./components/unauthorized";
import { ToastProvider } from "react-toast-notifications";
import ViewComplaints from "./components/ViewComplaints";
import CharacterCertificates from "./components/CharacterCertificates";
import ViewNOCs from "./components/ViewNOCs";

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

const App = () => {
  const [isAuth, setIsAuth] = useState("true");
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) setIsAuth("true");
      else setIsAuth("false");
    });
  }, []);
  console.log(isAuth);
  if (isAuth === "true") {
    return (
      <Router>
        <NavBar />
        <ToastProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/sign-in" component={Login} />
            <Route exact path="/u/:uid/home" component={Home} />
            <Route exact path="/u/:uid/admin-chat" component={AdminChat} />
            <Route
              exact
              path="/u/:uid/view-complaints"
              component={ViewComplaints}
            />
            <Route
              exact
              path="/u/:uid/character-certificates"
              component={CharacterCertificates}
            />
            <Route exact path="/u/:uid/noc-applications" component={ViewNOCs} />
            <Route component={NotFound} />
          </Switch>
        </ToastProvider>
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
            <Route exact path="/sign-in" component={Login} />
            <Route exact path="/u/:uid/home" component={UnAuthorized} />
            <Route exact path="/u/:uid/admin-chat" component={UnAuthorized} />
            <Route
              exact
              path="/u/:uid/character-certificates"
              component={UnAuthorized}
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
