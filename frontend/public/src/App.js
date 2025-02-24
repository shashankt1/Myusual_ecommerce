import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Checkout from './components/Checkout';
import ProductDetails from './components/ProductDetails'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={ProductList} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/product/:productId" component={ProductDetails} />  {/* Route for Product Details */}
      </Switch>
    </Router>
  );
}

export default App;
