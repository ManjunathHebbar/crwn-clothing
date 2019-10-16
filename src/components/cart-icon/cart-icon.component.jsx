import React from 'react'
import './cart-icon.styles.scss'
import { ReactComponent as ShoppingIcon } from '../../assests/shopping-bag.svg.svg'
import {connect} from 'react-redux'
import toggleCartHidden from '../../redux/cart/cart.action'

const CartIcon = ({toggleCartHidden}) => (
    <div className="cart-icon">
       <ShoppingIcon className="shopping-icon" onClick={toggleCartHidden}/>
       <span className="item-count">0</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default connect(null,mapDispatchToProps)(CartIcon);