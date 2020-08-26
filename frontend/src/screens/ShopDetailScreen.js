import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsShop } from '../actions/shopActions';
import { shopProducts,listCategories } from '../actions/productActions';

function ShopDetailScreen(props) {
  const shopDetails = useSelector((state) => state.shopDetails);
  const { shops, loading, error } = shopDetails;
  
  const shpProducts = useSelector((state) => state.shpProducts);
  const { products } = shpProducts;
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  
  let lsearch = window.location.search;
  let params = new URLSearchParams(lsearch);
  let searchKeyword = (params.get('search')) ? params.get('search') : '';
  let category = (params.get('category')) ? params.get('category') : '';
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsShop(props.match.params.id));
    dispatch(shopProducts(props.match.params.id,category,searchKeyword));
    dispatch(listCategories(category,searchKeyword));
    return () => {
      //
    };
  }, []);
  
  const sortHandler = (e) => {
    dispatch(shopProducts(props.match.params.id,category,searchKeyword, e.target.value));
  };
  
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
                    <form className="form m-0" action={process.env.PUBLIC_URL+"/shopbooks/"+shops._id}>
                        <div className="row">
                            <div className="col-4">
                                <label>Category</label>
                                <select id="category" name="category">
                                    <option value="">Select Category</option>
                                    {categories.map((pcategory) => (
                                        <option key={ pcategory } value={ pcategory } selected={(category === pcategory) ? "selected" :""}>{ pcategory }</option>
                                    ))}
                                </select>
                            </div>    
                            <div className="col-4">
                                <label>Keyword</label>
                                <input type="text" value={search}  onChange={(e) => setSearch(e.target.value)} id="search" name="search" />
                            </div>    
                            <div className="col-4">
                                <label>&nbsp;</label><div className="clearfix"></div>
                                <button type="submit" className="btn btn-primary">Search</button>
                            </div>    
                        </div>    
                    </form>
                    <h2>
                        {shops.name}
                        <div className="float-right h5">
                        <label>Sort By</label>{' '}
                        <select name="sortOrder" onChange={sortHandler}>
                          <option value="">Newest</option>
                          <option value="lowest">Lowest</option>
                          <option value="highest">Highest</option>
                        </select>
                        </div>
                    </h2>
                    <hr />
                    <div className="recent-book-sec">
                        {products.length === 0 ? <h4 align='center'>No Products Found</h4> : (
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
