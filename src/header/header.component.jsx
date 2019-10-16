import React from 'react'
import {Link} from 'react-router-dom'
import {ReactComponent as Logo} from '../assests/crown.svg.svg'
import './header.styles.scss'
import {auth} from '../firebase/firebase.utils'
import { connect } from 'react-redux'
import CartIcon from '../components/cart-icon/cart-icon.component'
import CartDropDown from '../components/cart-dropdown/cart-dropdown.component'

class Header extends React.Component {
render(){
  const {currentUser, hidden} = this.props;
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
           <CartIcon/>
         </div>
         { hidden ? null :
         <CartDropDown/>
         }
 </div>
 
);
}
}
const mapStateToProps = ({user:{currentUser}, cart:{hidden}}) => ({
  currentUser,
  hidden
})

export default connect(mapStateToProps)(Header);