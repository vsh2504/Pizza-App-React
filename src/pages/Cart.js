import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../CartContext';
import { getSuggestedQuery } from '@testing-library/react';

const Cart = () => {
  let totalPrice = 0;

  // Need to make this local state so that React knows that this is 
  // a reactive var and will dynamically render items whenever there is a change in this var
  const [products, setProducts] = useState([]);

  // Get the cart Context
  const { cart, setCart } = useContext(CartContext);

  // After every inc or dec item qty, cart was getting upd and thus useEffect for cart called the backend rest api server 
  // which caused a lot of overhead of requests on the server, to optimize it only call it once.
  const [ priceFetched, togglePriceFetched ] = useState(false);

  // We now have the IDs and we will call the server to fetch the latest prices and info
  // It can be possible user opens this page after a few days and we want to fetch latest prices and info from server
  // rather than storing an outdated and obsolete value in the local storage
  useEffect(() => {
    if(!cart.items || priceFetched) {
      return;
    }

    fetch('/api/products/cart-items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids: Object.keys(cart.items)})
    }).then(res => res.json())
    .then(products => {
      setProducts(products);
      togglePriceFetched(true);
    })
  }, [cart, priceFetched])

  // Create a function to get the Qty for each item
  const getQty = (productId) => {
    return cart.Items[productId];
  };

  // Increment Qty
  const increment = (productId) => {
    const existingQty = cart.Items[productId];
    const _cart = {...cart};
    _cart.items[productId] = existingQty + 1;
    _cart.totalItems += 1;
    setCart(_cart);
  }

  // Decrement Qty
  const decrement = (productId) => {
    const existingQty = cart.Items[productId];
    const _cart = {...cart};
    _cart.items[productId] = existingQty - 1;
    _cart.totalItems -= 1;

    // Handle for Qty <= 0
    if(_cart.items[productId] <= 0) {
      delete _cart.items[productId];
      // Also need to delete products list as the reactive state used to render is this
      setProducts(products.filter((product) => product._id !== productId))
    }

    setCart(_cart);
  }

  // Get Item Price wrt Qty
  const getPrice = (productId, price) => {
    const sum = price * getQty(productId);
    totalPrice += sum;
    return sum;
  }

  // Delete button logic
  const handleDelete = (productId) => {
    const _cart = {...cart};
    const qty =  _cart.items[productId];
    delete _cart.items[productId];
    _cart.totalItems -= qty;
    setCart(_cart);
    // Also need to delete products list as the reactive state used to render is this
    setProducts(products.filter((product) => product._id !== productId))
  }

  // Handle Order Now btn
  const handleOrderNow = () => {
    window.alert('Order Placed Successfully!');
    setProducts([]);
    setCart({});
  }

  return (
    products.length ?
    <div className="container mx-auto lg:w-1/2 w-full pb-24">
      <h1 className="my-12 font-bold">Cart Items</h1>
      <ul>
        {
          products.map(product => {
            return (
              <li className="mb-12" key={product._id}>
                <div className="flex items-center justify-between"> 
                  <div className="flex items-center">
                    <img className="h-16" src={ product.image } alt="pizza" />
                    <span className="font-bold ml-4 w-48">{ product.name }</span>
                  </div>

                  <div>
                    <button onClick={ () => { decrement(product._id) } } className="bg-yellow-500 px-4 py-2 rounded-full leading-none">-</button>
                    <b className="px-4">{ getQty(product._id) }</b>
                    <button onClick={ () => { increment(product._id) } } className="bg-yellow-500 px-4 py-2 rounded-full leading-none">+</button>
                  </div>

                  <span>₹{ getPrice(product._id, product.pric) }</span>
                  <button onClick={ () => { handleDelete(product._id) } } className="bg-red-500 px-4 py-2 rounded-full leading-none text-white">Delete</button>
                </div>
              </li>
            )
          })
        }        
      </ul>

      <hr className="my-6" />

      <div className="text-right">
        <b>Grand Total:</b> { totalPrice }
      </div>

      <div className="text-right mt-6">
        <button onClick={handleOrderNow} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">Order Now</button>
      </div>
    </div>
    :
    <img className="mx-auto w=1/2 mt-12" src="/images/empty-cart.png" alt="empty-cart" />
  )
}

export default Cart