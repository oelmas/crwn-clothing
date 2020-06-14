import React from 'react'

import { connect } from 'react-redux';

import { toggleCart } from '../../reducer/cart/cart.actions'
import { selectCartItemsCount } from '../../reducer/cart/cart.selector';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ( { toggleCart, itemCount } ) => {
  return ( <div className='cart-icon' onClick={toggleCart}>
    <ShoppingIcon className='shopping-icon'/>
    <span className='icon-count'>{itemCount}</span>
  </div> )
}

const mapDispatchToProps = ( dispatch ) => ( {
  toggleCart: () => dispatch( toggleCart() )
} )

const mapStateToProps = ( state ) => ( { itemCount: selectCartItemsCount( state ) } )

export default connect( mapStateToProps, mapDispatchToProps )( CartIcon );
