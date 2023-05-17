// Root component
// We can create components in react in 2 ways (Class components & Functional components)

// Import libs
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import About from './pages/About';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Navigation from './components/Navigation';
import SingleProduct from './pages/SingleProduct';
import { CartContext } from './CartContext';
import { useEffect, useState } from 'react';
import { getCart, setCart } from './helper';

// Functional component
// Name of func in capital and same as file name
const App = () => {
    // We need to create and store the cart as a local state in the parent App func
    // We need to detect changes in the cart, let's say when we add items
    const [ cart, setCart ] = useState({});

    // Whenever page is refreshed we need to fetch the cart from the local storage as we earlier stored it there.
    // Again we need to do only once after component is mounted so keep DependencyList [].
    // We need to persist the data when we refresh and get the latest cart data.
    useEffect(() => {
        // const cart = getCart();
        // setCart(JSON.parse(cart));
        // When we call the promise then inside 'then' we get the var which we wrapped around promise
        getCart().then(cart => {
            setCart(JSON.parse(cart));
        });
    }, []);

    // Watch the state of cart for any changes
    useEffect(() => {
        // We can only store string in local storage
        storeCart(JSON.stringify(cart));
    }, [cart]);

    // return the JSX from the function
    // It can only return only a single elem
    // Add a wrapper of div or we can use react framgments (<> tag)
    return (
        <>
            <Router>
                {/* // Now, we want to share this data with all the components like Navigation, ProductList, Home, Cart and SingleProduct etc.
                // We need to find the parent of all these -> which is <App/> component.
                // We need to wrap all the components together inside the Context, to which we want to pass the data. */}
                {/* We now need to just pass a value attribute which will be available to us inside all the components. */}
                <CartContext.Provider value={{cart: cart, setCart: setCart}}>
                    {/* Navbar */}
                    <Navigation />
                    <Routes>
                        {/* Each component in React takes html attributes called props or properties */}
                        <Route path="/" element={<Home />} exact></Route>
                        {/* <Route path="/about" element={<About />}></Route> */}
                        <Route path="/products" element={<ProductList />}></Route>
                        <Route path="/products/:_id" element={<SingleProduct />} exact></Route>
                        <Route path="/cart" element={<Cart />}></Route>
                    </Routes>
                </CartContext.Provider>
                
            </Router>
        </>
    )
}

export default App;