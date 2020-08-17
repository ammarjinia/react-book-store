import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsShop } from '../actions/shopActions';
import { shopProducts } from '../actions/productActions';

function ShopDetailScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  
  const shopDetails = useSelector((state) => state.shopDetails);
  const { shops, loading, error } = shopDetails;
  
  const shpProducts = useSelector((state) => state.shpProducts);
  const { products, loadingShpProducts, errorShpProducts } = shpProducts;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsShop(props.match.params.id));
    dispatch(shopProducts(props.match.params.id));
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
                    <Link className="breadcrumb-item" to={process.env.PUBLIC_URL+"/shop"}>Shop</Link>
                    <span className="breadcrumb-item active">{shops.name}</span>
                </div>
            </div>
            <section className="static about-sec">
                <div className="container">
                    <h2>{shops.name}</h2>
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
export default ShopDetailScreen;
