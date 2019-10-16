import React from 'react'
import {Link} from 'react-router-dom'
import {ReactComponent as Logo} from '../assests/crown.svg.svg'
import './header.styles.scss'
import {auth} from '../firebase/firebase.utils'
import { connect } from 'react-redux'

class Header extends React.Component {
render(){
  const {currentUser} = this.props;
  console.log(currentUser);
  return(
 <div className="header">
    <Link className="logo-container" to='/'>
      <Logo className="logo"></Logo>
    </Link>
     <div className="options">
      <Link className="option" to='/shop'>
        SHOP
      </Link>
      <Link className="option" to='/shop'>
        CONTACT
      </Link>
         {
           currentUser ? 
            (<div className="option" onClick={()=> auth.signOut()}>
             SIGN OUT
            </div>
            ):(
            <Link className="option" to='/sign-in'>
               SIGN IN
            </Link>
            )
           }
         
         
     </div>
 </div>
 
);
}
}
const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Header);