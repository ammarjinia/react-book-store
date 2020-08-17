import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Sidebar from '../layout/Sidebar'; 
import {
  saveProduct,
  listProducts,
  deleteProdcut,
} from '../actions/productActions';
import {
  listShops,
} from '../actions/shopActions';

function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [shopId, setShopId] = useState('');
  const [uploading, setUploading] = useState(false);
  const shopList = useSelector((state) => state.shopList);
  const { loadingshops, shops, errorshops } = shopList;
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  
  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    dispatch(listShops());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name || "");
    setPrice(product.price || "");
    setDescription(product.description || "");
    setImage(product.image || "");
    setBrand(product.brand || "");
    setCategory(product.category || "");
    setCountInStock(product.countInStock || "");
    setShopId(product.shopId || "");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
        shopId
      })
    );
  };
  const deleteHandler = (product) => {
      if (window.confirm("Are you sure to delete this data?")) {
        dispatch(deleteProdcut(product._id));
      }
  };
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads/s3', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  return (
        <>
            <div class="breadcrumb">
                <div class="container">
                    <a class="breadcrumb-item" href={process.env.PUBLIC_URL+"/"}>Home</a>
                    <span class="breadcrumb-item active">Profile</span>
                </div>
            </div>
            <section class="static about-sec">
                <div class="container">
                    <div className="row">
                        <div className="col-2">
                            <Sidebar activeMenu={'products'} />
                        </div>
                        <div className="col-10">
                {modalVisible && (
                    <div className="form1">
                      <form onSubmit={submitHandler}>
                        <ul className="form-container">
                          <li>
                            <h2>{id ? 'Edit' : 'Create'} Product</h2>
                          </li>
                          <li>
                            {loadingSave && <div>Loading...</div>}
                            {errorSave && <div>{errorSave}</div>}
                          </li>
                          <li>
                            <label htmlFor="name">Shop Name</label>
                            <select 
                              name="shopId"
                              value={shopId}
                              id="shopId"
                              onChange={(e) => setShopId(e.target.value)}
                            >
                                <option value="">Select Shop</option>
                                {shops.map((shop) => (
                                    <option key={shop._id} value={shop._id}>{shop.name}</option>        
                                ))}
                            </select>
                          </li>  
                          <li>
                            <label htmlFor="name">Name</label>
                            <input
                              type="text"
                              name="name"
                              value={name}
                              id="name"
                              onChange={(e) => setName(e.target.value)}
                            ></input>
                          </li>
                          <li>
                            <label htmlFor="price">Price</label>
                            <input
                              type="text"
                              name="price"
                              value={price}
                              id="price"
                              onChange={(e) => setPrice(e.target.value)}
                            ></input>
                          </li>
                          <li>
                            <label htmlFor="image">Image</label>
                            <input
                              type="text"
                              name="image"
                              value={image}
                              id="image"
                              onChange={(e) => setImage(e.target.value)}
                            ></input>
                            <input type="file" onChange={uploadFileHandler}></input>
                            {uploading && <div>Uploading...</div>}
                          </li>
                          <li>
                            <label htmlFor="brand">Brand</label>
                            <input
                              type="text"
                              name="brand"
                              value={brand}
                              id="brand"
                              onChange={(e) => setBrand(e.target.value)}
                            ></input>
                          </li>
                          <li>
                            <label htmlFor="countInStock">CountInStock</label>
                            <input
                              type="text"
                              name="countInStock"
                              value={countInStock}
                              id="countInStock"
                              onChange={(e) => setCountInStock(e.target.value)}
                            ></input>
                          </li>
                          <li>
                            <label htmlFor="name">Category</label>
                            <input
                              type="text"
                              name="category"
                              value={category}
                              id="category"
                              onChange={(e) => setCategory(e.target.value)}
                            ></input>
                          </li>
                          <li>
                            <label htmlFor="description">Description</label>
                            <textarea
                              name="description"
                              value={description}
                              id="description"
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                          </li>
                          <li>
                            <div>
                            <button type="submit" className="btn btn-primary btn-lg">
                              {id ? 'Update' : 'Create'}
                            </button>
                            &nbsp;
                            <button
                              type="button"
                              onClick={() => setModalVisible(false)}
                              className="btn btn-secondary btn-lg"
                            >
                              Back
                            </button>
                    </div>
                          </li>
                        </ul>
                      </form>
                    </div>
                )}
                <div className="product-header">
                    <h2>Products</h2>
                    <button className="btn btn-primary btn-lg" onClick={() => openModal({})}>
                      Create Product
                    </button>
                </div>
                <div className="product-list">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product._id}>
                          <td>{product._id}</td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.category}</td>
                          <td>{product.brand}</td>
                          <td>
                            <button className="btn btn-info btn-sm" onClick={() => openModal(product)}>
                              Edit
                            </button>{' '}
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteHandler(product)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
          </div>
                </div>
            </div>
        </section>
    </>
  );
}
export default ProductsScreen;
