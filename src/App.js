import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "../src/pages/homepage/homepage.component";
import ShopPage from "../src/pages/shop/shop.component.jsx";
import SignInAndSignOutPage from "../src/pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component.jsx";
import { auth } from './firebase/firebase.utils'


import "./App.css";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        }
    }


    unSubscribeFromAuth = null;

    componentDidMount() {
        this.unSubscribeFromAuth = auth.onAuthStateChanged(user => {
            this.setState({ currentUser: user });

            console.log(user);
        });
    }

    componentWillUnmount() {
        this.unSubscribeFromAuth();
    }

    render() {

        return (
            <div>
                    <Header currentUser={this.state.currentUser}/>
                    <Switch>
                      <Route exact path="/" component={HomePage} />
                      <Route path="/shop" component={ShopPage} />
                      <Route path="/signin" component={SignInAndSignOutPage} />
                    </Switch>
            </div>
        );
    }
}





export default App;