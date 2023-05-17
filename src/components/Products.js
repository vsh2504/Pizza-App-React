import React from 'react';
import Product from './Product';
// Store state in component use this hook
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../CartContext'; // use this with useContext hook

const Products = () => {
  // We need to specify to useContext which context we want to use
  // We can also create multiple contexts for diff things and features
  const { name } = useContext(CartContext);

  // Fetch the data from the server and render the products
  // We will use simple fetch API instead of Axios
  // Now, one more thing is we are using functional components 
  // Class based components have their states maintained to store stuff
  // But in func comp there is no such concept of state
  // In React we have hooks using which we can maintain the state of our App/Component

  // The speciality abt this is the state under created using this func is 'reactive' in nature.
  // Whenever there is a change in products var, the component will be re-rendered. 
  // Only vars created using this useState method are capable of showing this reactive behavior.
  const [products, setProducts] = useState([]); // Called 'Destructuring Assignment' return (data, func reference)

  // Fetch products data from backend REST api server
  // We will fetch data only when this component is mounted.
  // When we use Class based syntax in React, there are some lifecycle hooks
  // These help to do a particular thing at a particular time. 
  // E.g. Here we need to do something after comp gets mounted/comp gets destroyed/after a state change etc.

  // How to know the comp has been mounted? React provides a hook 'useEffect'.
  // pass to it (callback fn -> to call when an item in dependecy list changes, dependencyList)
  // If depedencyList passed as empty then this callback fn run once after comp is mounted.
  useEffect(() => {
    // console.log('Component mounted....')
    // run the REST API project locally first
    // fetch returns a promise and convert streams return to json
    fetch('/api/products')
    .then(response => response.json())
    .then(products => {
        setProducts(products)
        console.log(products)
    });
  }, []);

  return (
    <div className="container mx-auto pb-24">
        <h1 className="text-lg font-bold my-8">Products</h1>

        <div className="grid grid-cols-5 my-8 gap-24">
            { 
                // In React we need to give these <Product/> a unique key which react uses to detect changes
                // do optimization and updates in the Virtual DOM.
                // Pass data to comp using props using tag attributes
                products.map(product => <Product key={product._id} product={product} />)
            }
        </div>
    </div>
  )
}

export default Products