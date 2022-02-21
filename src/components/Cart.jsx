
import React, {useContext, useState } from 'react';
import { useHistory, Route , withRouter } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout';
import {CartContext} from '../Global/CartContext';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}


const __DEV__ = document.domain === 'localhost'

const Cart = (token) => {

    const [name, setName] = useState('Mehul')

	async function displayRazorpay(props) {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

   
        const product = {name: 'All Products', price: totalPrice, order_id:'',tqty:qty,}
        const response = await axios.post('http://localhost:5000/razorpay', {
          
           token,
           product
          
        });
        const {status} = response.data;
        console.log(response.status)
  
       

		console.log(response.data)

        const { amount, id: order_id, currency, address,pincode  } = response;
 
		const options = {
          
			key: __DEV__ ? 'rzp_live_yTzT1C25rSd0d0' : 'PRODUCTION_KEY',
			currency: response.currency,
            amount: product.price*100,
			order_id: response.data.id,
            address:response.data.address,
            pincode:response.data.pincode,
            notes: {
                address:response.data.address,
                pincode:response.data.pincode,
              },
            product:response.data.product,
			name: 'Buy Laptops',
			description: 'Thank you for nothing. Please give us some money',
            address:"1274",

			handler: function (response) {
				alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
				alert(response.razorpay_signature)
                console.log(response.status)
                if (response.status === 200) {
                    dispatch({type: 'EMPTY'});
              
                    toast.success("You have paid successfully now you can continue your shopping!", {
                      position: toast.POSITION.TOP_RIGHT
                    });
                  } else {
                   
                    dispatch({type: 'EMPTY'});
                  
                    toast.success("You have paid successfully now you can continue your shopping!", {
                        position: toast.POSITION.TOP_RIGHT
                       
                        
                      });
                  }
                 
			},
            prefill: {
				name,
                address:'',
                pincode:'',
				email: 'sdfdsjfh2@ndsfdf.com',
				phone_number: '',
                callback_url: 'http://localhost:3000/ecommarce-Webapp',
      redirect: true,
			},
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
            
		}
      
  
        console.log(product.order_id)
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()

     
     
	}
    
       
    const {dispatch, shoppingCart, totalPrice, qty} = useContext(CartContext);
         console.log("total qty: ",qty);

    const handleToken = async (token) => {


        const product = {name: 'All Products', price: totalPrice}
          const response = await axios.post('http://localhost:5000/checkout', {
            
             token,
             product
            
          });
          console.log(response.status)
          const {status} = response.data;
    


    }
    console.log(shoppingCart);
    return(
        <>
            <div className='cart-container'>
                <div className='cart-details' style={{marginTop: '20px'}}>
                    {shoppingCart.length > 0 ?
                        shoppingCart.map(cart =>(
    <div className='cart' key={cart.id}>
    <span className='cart-image'><img src={cart.image} alt='not found' /> </span>
    <span className='cart-product-name'>  {cart.name}  </span>
    <span className='cart-product-price'>  {cart.price}  </span>


    
    <span className='inc' onClick={() => dispatch({type: 'INC', id: cart.id, cart})}> <i className="fas fa-plus"></i>  </span>
    <span className='product-quantity'>  {cart.qty}  </span>
    <span className='dec' onClick={ () => dispatch({type: 'DEC', id: cart.id, cart})}>  <i className="fas fa-minus"></i>   </span>
    <span className='product-total-price'>  {cart.price * cart.qty}</span>
    <span className='delete-product' onClick={() => dispatch({type: 'DELETE', id: cart.id, cart})}> <i className="fas fa-trash-alt"></i> </span>    
                            </div>
                        ))
                    : 'Sorry your cart is currently empty'}
                </div>
                 {shoppingCart.length > 0 ? <div className='cart-summary'> 
                    <div className='summary'>
                            <h3>Cart Summary</h3>
                            <div className='total-items'>
                                <div className='items'>Total Items</div>
                                <div className='items-count'> {qty} </div>
                             </div>
                             <div className='total-price-section'>
                                 <div className='just-title'>Total Price </div>
                                 <div className='items-price'>Rs. {totalPrice}.00</div>
                             </div>
                             <a
					className="checkoutbutton"
					onClick={displayRazorpay}
					target="_blank"
					rel="noopener noreferrer"
				>
					Make Payment
				</a>
            
         
                    </div>
                 </div> : ''}
            </div>
        </>
    );
}

export {Cart};