import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';

function HomeScreen(props) {  
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <>
        <section className="slider">
            <div className="container">
                <div id="owl-demo" className="owl-carousel owl-theme">
                    <div className="item">
                        <div className="slide">
                            <img src="./assets/images/slide1.jpg" alt="slide1" height="400" />
                            <div className="content">
                                <div className="title">
                                    <h3>welcome to bookstore</h3>
                                    <h5>Discover the best books online with us</h5>
                                    <a href="#" className="btn">shop books</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="slide">
                            <img src="./assets/images/slide2.jpg" alt="slide1" height="400" />
                            <div className="content">
                                <div className="title">
                                    <h3>welcome to bookstore</h3>
                                    <h5>Discover the best books online with us</h5>
                                    <a href="#" className="btn">shop books</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
            <>
            <section className="recomended-sec">
                <div className="container">
                    <div className="title">
                        <h2>highly recommendes books</h2>
                        <hr />
                    </div>
                    <div className="row">
                        {products.map((product) => (
                        <div className="col-lg-3 col-md-6" key={product._id}>
                            <div className="item">
                                <img src={product.image} alt="" />
                                <h3>{ product.name }</h3>
                                <h6><span className="price">Rs {product.price}</span> / <a href={'/product/' + product._id}>Buy Now</a></h6>
                                <div className="hover">
                                    <a href={'/product/' + product._id}>
                                    <span><i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="about-sec">
                <div className="about-img">
                    <figure style={{ background:"url(./assets/images/about-img.jpg)" }}></figure>
                </div>
                <div className="about-content">
                    <h2>About bookstore,</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's printer took a galley of type and Scrambled it to make a type and typesetting industry. Lorem Ipsum has been the book. </p>
                    <p>It has survived not only fiveLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's printer took a galley of type and</p>
                    <div className="btn-sec">
                        <Link to="/" className="btn yellow">Shop Books</Link>
                    </div>
                </div>
            </section>
            <section className="recent-book-sec">
                <div className="container">
                    <div className="title">
                        <h2>New Release</h2>
                        <hr />
                    </div>
                    <div className="row">
                        {products.map((product) => (
                        <div className="col-lg-2 col-md-3 col-sm-4" key={product._id}>
                            <div className="item">
                                <img src={product.image} alt="" />
                                <h3><a href={'/product/' + product._id}>{ product.name }</a></h3>
                                <h6><span className="price">Rs{product.price}</span> / <a href={'/product/' + product._id}>Buy Now</a></h6>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className="btn-sec">
                        <a href="#" className="btn gray-btn">view all books</a>
                    </div>
                </div>
            </section>
          </>
      )}
    </>
  );
}
export default HomeScreen;
