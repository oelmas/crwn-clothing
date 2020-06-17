import "./App.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import HomePage from "../src/pages/homepage/homepage.component";
import ShopPage from "../src/pages/shop/shop.component";
import CheckoutPage from "../src/pages/checkout/checkout.component";
import SignInAndSignOutPage from "../src/pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import Header from "./components/header/header.component.jsx";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./reducer/user/user.actions";
import { selectCurrentUser } from "./reducer/user/user.selector";

class App extends Component {
  unSubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      this.setState({ currentUser: userAuth });
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({ currentUser: snapShot.id, ...snapShot.data() });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignOutPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
