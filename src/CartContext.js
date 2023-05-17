// In React, there can be 4 situations which we can divide for passing info
// We may need to pass info from:-
//  1) Parent to Child Component        ->      We use props for this
//  2) Child to Parent Component        ->      For this we can define a function in parent and pass it as prop to 
//                                              child & call this inside child comp and pass data to parent
//  3) Sibling components               ->      For this we can use chained functions or ways to pass info through multiple comps
//  4) No fixed/Arbitrary relationship  ->      For this we can use again chained method but way to complex

// TO Handle all this React gives us 'Context APIs' using which we can store the data at a centralized loc or we can 
// say at root level and then we can use that data in diff components by sharing data with them.
// Using Context APIs works well for small projects.
// For bigger prod level projects we need a more robust soln like Redux.js state mgmt libs.
// For our small project level we will use Context APIs.

// Import a method from React for creating context
import { createContext } from 'react';

export const CartContext = createContext(null);

// Now, we want to share this data with all the components like Navigation, ProductList, Home, Cart and SingleProduct etc.
// We need to find the parent of all these -> which is <App/> component.
// We need to wrap all the components together inside the Context, to which we want to pass the data.