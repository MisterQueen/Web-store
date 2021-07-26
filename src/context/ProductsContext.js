import {createContext} from "react"

// global state of products

const defaultState = {
  products: [],
  addProduct: () => {
  },
  removeProduct: () => {
  },
  updateProduct: () => {
  }
};

const ProductsContext = createContext(defaultState);

export default ProductsContext;
