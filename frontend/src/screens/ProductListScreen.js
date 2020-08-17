import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

function ProductListScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const dispatch = useDispatch();

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let searchKeyword = params.get('search');
  
  useEffect(() => {
    dispatch(listProducts('',searchKeyword));
    return () => {
      //
    };
  }, []);
  
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
            <>
            <div className="breadcrumb">
                <div className="container">
                    <Link className="breadcrumb-item" to={process.env.PUBLIC_URL+"/"}>Home</Link>
                    <span className="breadcrumb-item active">{searchKeyword}</span>
                </div>
            </div>
            <section className="static about-sec">
                <div className="container">
                    <h2>Search: {searchKeyword}</h2>
                    <div className="recent-book-sec">
                        {products.length == 0 ? <h4 align='center'>No Products Found</h4> : (
                        <div className="row">
                        {products.map((product) => (
                        <div className="col-lg-2 col-md-3 col-sm-4" key={product._id}>
                            <div className="item">
                                <Link to={'/product/' + product._id}><img src={product.image} alt="" /></Link>
                                <h3><Link to={'/product/' + product._id}>{ product.name }</Link></h3>
                                <h6><span className="price">Rs{product.price}</span> / <a href={'/product/' + product._id}>Buy Now</a></h6>
                            </div>
                        </div>
                        ))}
                        </div>
                        )}
                    </div>
                </div>
            </section>
        </>
      )}
    </div>
  );
}
export default ProductListScreen;
