import React from 'react'
import CartStyles from './styles/CartStyles'
import { useUser } from './User'
import Supreme from './styles/Supreme'
import CloseButton from './styles/CloseButton'
import styled from 'styled-components'
import formatMoney from '../lib/formatMoney'
import calcTotalPrice from '../lib/calcTotalPrice'
import { useCart } from '../lib/cartState'
import RemoveFromCart from './RemoveFromCart'
import Checkout from './Checkout'

const CartItemStyles = styled.li`
    padding: 1em 0;
    border-bottom: 1px solid var(--lightGray);
    display: grid;
    grid-template-columns: auto 1fr auto;
    img{
        margin-right: 1rem;
    }
    h3, p{
        margin: 0;
    }

`

const CartItem = ({cartItem}) => {
    const product = cartItem.product
    return <CartItemStyles>
        <img src={product.photo.image.publicUrlTransformed} width={100} alt={product.image}/>
        <div>
            <h3>{product.name}</h3>
            <p>{formatMoney(product.price * cartItem.quantity)} - <em>{cartItem.quantity} &times; {formatMoney(product.price)}</em></p>
        </div>
        <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
}

const Cart = () => {
    const me = useUser()
    const { cartOpen, closeCart} = useCart()
    if(!me) return null;
    return (
        <CartStyles open={cartOpen}>
            <CloseButton type='button' onClick={closeCart}>&times;</CloseButton>
            <header>
                <Supreme>{me.name}'s cart</Supreme>
            </header>
            <ul>
                {me.cart.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem}/>)}
            </ul>
            <footer>
                <p>{formatMoney(calcTotalPrice(me.cart))}</p>
                <Checkout />
            </footer>
        </CartStyles>
    )
}

export default Cart
