import './App.css';

import React, {
  Component
} from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import {
  connect
} from 'react-redux';

import HomePage from '../src/pages/homepage/homepage.component';
import ShopPage from '../src/pages/shop/shop.component.jsx';
import SignInAndSignOutPage from '../src/pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import Header from './components/header/header.component.jsx';
import {
  auth,
  createUserProfileDocument
} from './firebase/firebase.utils';
import {
  setCurrentUser
} from './reducer/user/user.actions';


class App extends Component {

  unSubscribeFromAuth = null;

  componentDidMount() {
    const {
      setCurrentUser
    } = this.props;

    this.unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      this.setState({
        currentUser: userAuth
      });
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            currentUser: snapShot.id,
            ...snapShot.data()
          })
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
                <Route exact path='/' component={HomePage} />
                <Route path = '/shop' component ={ShopPage} />
                <Route exact path='/signin' render = {() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignOutPage />)} />
        </Switch>
      </div>);
  }
}

const mapStateToProps = ({
  user
}) => ({
  currentUser: user.currentUser
});


const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(App);