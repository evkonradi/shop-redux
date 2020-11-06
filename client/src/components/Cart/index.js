import React, { useEffect } from 'react';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';

import { idbPromise } from "../../utils/helpers";

import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/react-hooks';

import { useSelector } from 'react-redux'
import { toggleCart, addMultipleToCart } from './cartSlice';
import { useDispatch } from 'react-redux';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {

    const cartItems = useSelector(state => state.cart.items);
    const cartOpen = useSelector(state => state.cart.cartOpen);
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getCart() {
          const cart = await idbPromise('cart', 'get');
          dispatch(addMultipleToCart({products: [...cart] }));
        };
      
        if (!cartItems.length) {
          getCart();
        }
    }, [cartItems.length, dispatch]);

    //this hook is for stripe
    useEffect(() => {
        if (data) {
          stripePromise.then((res) => {
            res.redirectToCheckout({ sessionId: data.checkout.session });
          });
        }
      }, [data]);

    function toggleCartClick() {
      dispatch(
        toggleCart()
      );
    }

    function calculateTotal() {
        let sum = 0;
        cartItems.forEach(item => {
          sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    function submitCheckout() {
        const productIds = [];
      
        cartItems.forEach((item) => {
          for (let i = 0; i < item.purchaseQuantity; i++) {
            productIds.push(item._id);
          }
        });

        getCheckout({
            variables: { products: productIds }
          });
      }

    if (!cartOpen) {
        return (
          <div className="cart-closed" onClick={toggleCartClick}>
            <span
              role="img"
              aria-label="trash">🛒</span>
          </div>
        );
    }

    return (
        <div className="cart">
            <div className="close" onClick={toggleCartClick}>[close]</div>
            <h2>Shopping Cart</h2>
            {cartItems.length ? (
                <div>
                    {cartItems.map(item => (
                        <CartItem key={item._id} item={item} />
                    ))}
                    <div className="flex-row space-between">
                        <strong>Total: ${calculateTotal()}</strong>
                        {
                        Auth.loggedIn() ?
                            <button onClick={submitCheckout}>
                            Checkout
                            </button>
                            :
                            <span>(log in to check out)</span>
                        }
                    </div>
                </div>
            ) : (
                <h3>
                <span role="img" aria-label="shocked">
                    😱
                </span>
                You haven't added anything to your cart yet!
                </h3>
            )}
        </div>
    );
};

export default Cart;