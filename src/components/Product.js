// Product card component
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { cartContext } from '../CartContext'  

const Product = (props) => {
  const { isAdding, setIsAdding } = useState(false);    // Track state when adding something to cart
  const { cart, setCart } = useContext(CartContext)
  const { product } = props;

  const addToCart = (event, product) => {
      event.preventDefault();

      // Get existing cart
      let _cart = {...cart}; // Clone obj and pass as JS objects pass by ref

      // Cart Format
      // const cart = {
      //   items: {
      //     '608c2960e165f6137f02bb552': 2,
      //     '608c2960e165f6137f02bb550': 3
      //   },
      //   totalItems: 5
      // }

      // If cart empty i.e. no items then add 'items' key
      if(!_cart.items) {
        _cart.items = {}
      }

      // if item already exixts then inc its Qty else init its Qty to 1
      if (_cart.items[product._id]) {
        _cart.items[product._id] += 1;
      } else {
        _cart.items[product._id] = 1;
      }

      if(_cart.totalItems) {
        _cart.totalItems = 0;
      }
      _cart.totalItems += 1;
      setCart(_cart);
      setIsAdding(true);

      // Set the state to false after some time to restore state back to yellow
      setTimeout(() => {
        setIsAdding(false);
      }, 1000);
  }

  return (
    <Link to={`/products/${product._id}`}>
      <div>
        <img src={product.image} alt="pizza" />
        <div className="text-center">
            <h2 className="text-lg font-bold py-2">{ product.name }</h2>
            <span className="bg-gray-200 py-1 rounded-full text-sm px-4">
                { product.size }
            </span>
        </div>
        
        <div className="flex justify-between items-center mt-4">
            <span>₹{ product.price }</span>
            <button disabled={isAdding} onClick={ () => { addToCart(e, product) } } className={`${isAdding ? 'bg-green-500' : 'bg-yellow-500'} py-1 px-4 rounded-full font-bold`}>{ `${isAdding ? 'ADDED' : 'ADD'}` }</button>
        </div>
      </div>
    </Link>
    
  )
}

export default Product