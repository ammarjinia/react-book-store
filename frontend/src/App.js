import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './layout/Header';  
import Footer from './layout/Footer';
import HomeScreen from './screens/HomeScreen';
import ShopScreen from './screens/ShopScreen';
import ShopDetailScreen from './screens/ShopDetailScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import ShopsScreen from './screens/ShopsScreen';
import UsersScreen from './screens/UsersScreen';
import MyOrdersScreen from './screens/MyOrdersScreen';
import ProductListScreen from './screens/ProductListScreen';
import AboutScreen from './screens/AboutScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';


function App() {

  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };
  return (
    <BrowserRouter>
        <Header />
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul className="categories">
            <li>
              <Link to="/category/Pants">Pants</Link>
            </li>

            <li>
              <Link to="/category/Shirts">Shirts</Link>
            </li>
          </ul>
        </aside>
        <Route path="/shop" component={ShopScreen} />
        <Route path="/shopbooks/:id" component={ShopDetailScreen} />
        <Route path="/orders" component={OrdersScreen} />
        <Route path="/myorders" component={MyOrdersScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/order/:id" component={OrderScreen} />
        <Route path="/shops" component={ShopsScreen} />
        <Route path="/products" component={ProductsScreen} />
        <Route path="/productlist" component={ProductListScreen} />
        <Route path="/shipping" component={ShippingScreen} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/reset" component={ResetPasswordScreen} />
        <Route path="/signin" component={SigninScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/category/:id" component={ProductListScreen} />
        <Route path="/users" component={UsersScreen} />
        <Route path="/aboutus" component={AboutScreen} />
        <Route path="/" exact={true} component={HomeScreen} />
        <Footer />
    </BrowserRouter>
  );
}

export default App;
