import React from 'react';
import {Switch, Route} from 'react-router-dom'
import HomePage from './pages/homepage.component'
import ShopPage from './pages/shop-page/shop.component'
import SingInSignUpComponent from './pages/sign-in-and-sign-up/sign-in-sign-up.component'
import Header from './header/header.component'
import {setCurrentUser} from './redux/user/user.action'
import { connect } from 'react-redux'
import './App.css';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';


class App extends React.Component {
  unsubscribeFromAuth = null;
  componentDidMount(){
    const {setCurrentUser} = this.props;
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
          if(userAuth) {
            const userRef = await createUserProfileDocument(userAuth)
            
            userRef.onSnapshot(snapShot => {
              setCurrentUser({
                    id: snapShot.id,
                    ...snapShot.data()
                  })  
                })
            }
            setCurrentUser(userAuth)
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
  return(
    <div>
      <Header/>
       <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route path='/shop' component={ShopPage}></Route>
          <Route path='/sign-in' component={SingInSignUpComponent}></Route>
       </Switch>
    </div>
  );
}
}

const mapDispactchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})


export default connect(null,mapDispactchToProps)(App);
