import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Products from "./pages/Products";
import CssBaseline from '@material-ui/core/CssBaseline';
import ProductsContext from "./context/ProductsContext";
import {useEffect, useState} from "react";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const [products, addProducts] = useState([]);

  const updateProduct = val => {
    const copy = JSON.parse(JSON.stringify(products));
    const find = copy.find(item => item.id === val.id);
    const index = copy.indexOf(find);
    copy[index] = val;
    addProducts(copy);
  };

  const removeProduct = id => {
    const copy = JSON.parse(JSON.stringify(products));
    const find = copy.find(item => item.id === id);

    if (find) {
      const index = copy.indexOf(find);
      copy.splice(index, 1);
      addProducts(copy);
    }
  };

  const setProduct = val => {
    addProducts([...products, val]);
  };

  useEffect(() => {
    if (products.length) {
      // after update products, saved in storage
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    // loading products from storage
    const val = JSON.parse(localStorage.getItem('products') || '[]');
    val.forEach(values => {
      values.count = +values.count;
      values.size.width = +values.size.width;
      values.size.height = +values.size.height;
    });
    addProducts(val);
  }, []);

  return (
    <ProductsContext.Provider value={{products, addProduct: setProduct, removeProduct, updateProduct}}>
      <CssBaseline/>
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/products/:id"><ProductDetails/></Route>

          <Route path="/products"><Products/></Route>

          <Route path="*"><Redirect to="/products"/></Route>
        </Switch>
      </Router>
    </ProductsContext.Provider>
  );
}

export default App;
