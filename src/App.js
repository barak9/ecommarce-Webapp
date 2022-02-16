import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Navbar} from './components/Navbar';
import {Contact} from './components/Contact';
// import {Banner} from './components/Banner';
import {Products} from './components/Products'
import ProductsContextProvider from './Global/ProductsContext'; 
import {Cart} from './components/Cart';
import {NotFound} from './components/NotFound';
import CartContextProvider from './Global/CartContext';


const App = () =>{


  return(
    <>
    <ProductsContextProvider>
      <CartContextProvider>
        <Router>
            <Navbar />

           <Switch>
              <Route path='/ecommarce-Webapp' exact component={Products} />
                <Route path='/cart' exact component={Cart}  />
                <Route path='/contact' exact component={Contact} />
                <Route component={NotFound} />
            </Switch>
         </Router>
      </CartContextProvider>
    </ProductsContextProvider>
    </>
  );
}

export default App;
