import { createContext, useState } from 'react'
// import { onAuthStateChangedListener } from 'firebase/auth';
import SHOP_DATA from '../shop-data.json'


export const ProductContext = createContext({
    products: [],
    setProduct: () => null
});

export const ProductProvider = ({children}) => {
    const [products, setProduct] = useState(SHOP_DATA);
    const value = { products }

    // useEffect(()=>{
    // //
    // }, []);
    return (<ProductContext.Provider value={value}>{children}</ProductContext.Provider>)
}

