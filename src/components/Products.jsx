import React, {useContext} from 'react';
import {ProductsContext} from '../Global/ProductsContext';
import '../App.css';
import {Banner} from './Banner';
import {CartContext} from '../Global/CartContext';



const Products = () =>{


    const {products} = useContext(ProductsContext);
    const {dispatch} = useContext(CartContext);
    
    // console.log(products);

    return(
        <> 
 <div className='container'> 
        <Banner />
    <div className='products'>
        {
            products.map((product) =>(
                <div className='product' key={product.id}>
                   
                        <div className='product-image'>
                            <img src={product.image}  alt='not found' />
                        </div> 
                        <div className='product-details'>
                            <div className='product-name'>
                                {product.name}
                            </div>
                            <div className='product-name'>
                               Ram: {product.Ram}
                            </div>
                            <div className='product-name'>
                            Color: {product.color}
                            </div>
                            <div className='product-name'>
                            HardDisk: {product.HardDisk}
                            </div>
                            <div className='product-price'>
                               Price: {product.price}.00
                            </div>                            
                        </div>
                    
                        <div className='add-to-cart' onClick={() => dispatch({type: 'ADD_TO_CART', id: product.id, product})}>Add to cart</div>  
    {product.status === 'hot' ? <div className='hot'>Hot</div> : ''}
     
                </div>
            ))
        }
    </div>
</div>    
         </>
    );
}

export {Products};