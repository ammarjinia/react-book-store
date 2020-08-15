import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {  
    
        const userSignin = useSelector((state) => state.userSignin);
        const { userInfo } = userSignin;
        return (  
            <div>
                <header>
                    <div className="header-top">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="ph-number">Call : 990 123 5678</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-menu">
                        <div className="container">
                            <nav className="navbar navbar-expand-lg navbar-light">
                            <Link className="navbar-brand" to="/"><img src={process.env.PUBLIC_URL+"/assets/images/logo.png"} alt="logo" /></Link>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="navbar-item active">
                                            <Link to={process.env.PUBLIC_URL+"/"}>Home</Link>
                                        </li>
                                        <li className="navbar-item">
                                            <a href="#" className="nav-link">Shop</a>
                                        </li>
                                        <li className="navbar-item">
                                            <a href="#" className="nav-link">About</a>
                                        </li>
                                        <li className="navbar-item">
                                            {userInfo ? (
                                              <>
                                              <Link to={process.env.PUBLIC_URL+"/profile"}>{userInfo.name}</Link>
                                      {/*<ul>
                                                <li>
                                                    <Link to={process.env.PUBLIC_URL+"/products"}>Products</Link>
                                                </li>
                                                <li>
                                                    <Link to={process.env.PUBLIC_URL+"/orders"}>Orders</Link>
                                                </li>
                                              </ul>*/}
                                              </>
                                            ) : (
                                              <Link to={process.env.PUBLIC_URL+"/signin"} className="nav-link">Login</Link>
                                            )}
                                        </li>
                                    </ul>
                                </div>
                                <div class="cart my-2 my-lg-0">
                                    <Link to={process.env.PUBLIC_URL+"/cart"} className="nav-link">
                                        <span><i class="fa fa-shopping-cart" aria-hidden="true"></i></span>
                                    </Link>    
                                </div>
                            </nav>
                        </div>
                    </div>
                </header>
            </div>  
        )  
}  
  
export default Header  
