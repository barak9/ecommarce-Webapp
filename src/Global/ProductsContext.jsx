import React, {createContext, useState} from 'react';
import camera from '../assets/hp.jpg';
import phone from '../assets/lanavo.jpg';
import shoes from '../assets/dell.jpg';
import watch from '../assets/acer.jpg';
import ring from '../assets/ring.jpg';
import perfume from '../assets/perfume.jpg';
import headphone from '../assets/headphone.jpg';
import mike from '../assets/mike.jpg';
import hpdesktop from '../assets/hp-desktop.jpg';
import delldesktop from '../assets/dell-desktop.jpg';
import acerdesktop from '../assets/acer-desktop.jpg';
import lanaavodesktop from '../assets/lanaavo-desktop.jpg';

export const ProductsContext = createContext();

const ProductsContextProvider = (props) =>{
    const [products] = useState([
        {id: 1, name: 'HP Laptop Gaming series', price:  14999, image: camera, Ram: '8GB', HardDisk:'256SSD',color: 'Black', status: 'hot'},
        {id: 2, name: 'Lanavo Development Series', price:  19999, image: phone,  Ram: '8GB', HardDisk:'256SSD',color: 'LightGrey',status: 'new'},
        {id: 3, name: 'Dell Reyzen Series', price: 6599, image: shoes,  Ram: '8GB', HardDisk:'256SSD',color: 'Silver', status: 'hot'},
        {id: 4, name: 'Acer i5 Series', price: 9295, image: watch ,  Ram: '8GB', HardDisk:'256SSD',color: 'Black', status: 'new'},
        {id: 5, name: 'HP Desktop', price:  2999, image: hpdesktop,  Ram: '8GB', HardDisk:'500SSD',color: 'Grey', status: 'new'},
        {id: 6, name: 'Dell Desktop', price: 297, image: delldesktop,  Ram: '8GB', HardDisk:'256SSD',color: 'Sliver', status: 'hot'},
        {id: 7, name: 'Lanaavo Desktop', price: 5999, image: lanaavodesktop,  Ram: '8GB', HardDisk:'256SSD',color: 'black', status: 'new'},
        {id: 8, name: 'Acer Desktop', price: 3899, image: acerdesktop,  Ram: '4GB', HardDisk:'256SSD',color: 'black', status: 'hot'},
    ]);

    return(
        <>
        <ProductsContext.Provider value={{products: [...products]}}>
            {props.children}
        </ProductsContext.Provider>
        </>        
    );
}


export default ProductsContextProvider;