import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ToastProvider } from "react-toast-notifications";

import { auth } from "./components/Firebase";
// components
import Home from "./components/Home";
import NewComplaint from "./components/NewComplaint";
import VpsChat from "./components/VpsChat";
import ComplaintStatus from "./components/ComplaintStatus";
import SignUp from "./components/Signup";
import SignIn from "./components/Login";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import CharCert from "./components/CharCert";
import ApplyNoc from "./components/ApplyNoc";
import Profile from "./components/Profile";
import PastIncidents from "./components/PastIncidents";
import NotFound from "./components/notfound";
import Unauthorized from "./components/unauthorized";

const App = (props) => {
  const [user, setUser] = useState("");
  const [isAuth, setIsAuth] = useState("true");
  console.log("App.js called");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
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
