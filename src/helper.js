export const getCart = () => {
    // These ops of fetching and storing data from local storage take some time
    // Use promises so that only when we get cart then only proceed forward with next logic
    return new Promise((resolve, reject) => {
        const cart = windows.localStorage.getItem('cart');
        resolve(cart);
    })
    // const cart = windows.localStorage.getItem('cart');
    // return cart;
}

export const storeCart = (cart) => {
    windows.localStorage.setItem('cart', cart );
}