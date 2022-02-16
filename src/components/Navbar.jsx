import React, {useContext} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import {CartContext} from '../Global/CartContext';
const Navbar = () =>{
    const {qty} = useContext(CartContext);
    return(
        <>
            <nav>
                <ul className='left'>
                    <li>
                        <Link to='/'>BARAK'S</Link>
                    </li>
                </ul>

                <ul className='center'>
                    <li>
                        <Link to='contact'> Contact </Link>
                    </li>
                </ul>
                <ul className='right'>
                    <li><Link to='cart'>
                            <span className='shopping_cart'>
                            <i className="fas fa-shopping-cart"></i>
                            <span className='cart_count'>{qty}</span>
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}


export {Navbar};