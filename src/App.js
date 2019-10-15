import React from 'react';
import {Switch, Route} from 'react-router-dom'
import HomePage from './pages/homepage.component'
import ShopPage from './pages/shop-page/shop.component'
import SingInSignUpComponent from './pages/sign-in-and-sign-up/sign-in-sign-up.component'
import Header from './header/header.component'
import './App.css';
 
  import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      currentUser: 'null'
    }
  }
  
  unsubscribeFromAuth = null;
  
  componentDidMount(){
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
          if(userAuth) {
            const userRef = await createUserProfileDocument(userAuth)
            
            userRef.onSnapshot(snapShot => {
                this.setState({
                  currentUser:{
                    id: snapShot.id,
                    ...snapShot.data()
                  }
                })
                console.log(this.state)
            })
            
          }
          this.setState({currentUser:userAuth})
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
  return(
    <div>
      <Header currentUser = {this.state.currentUser}/>
       <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route path='/shop' component={ShopPage}></Route>
          <Route path='/sign-in' component={SingInSignUpComponent}></Route>
       </Switch>
    </div>
  );
}
}
export default App;
