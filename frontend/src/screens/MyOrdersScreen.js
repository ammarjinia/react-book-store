import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../layout/Sidebar'; 

function MyOrdersScreen(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name, password }))
  }
  const userUpdate = useSelector(state => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const myOrderList = useSelector(state => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo.name)
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
    }
    dispatch(listMyOrders());
    return () => {

    };
  }, [userInfo])

  return (
    <>
        <div className="breadcrumb">
            <div className="container">
                <a className="breadcrumb-item" href={process.env.PUBLIC_URL+"/"}>Home</a>
                <span className="breadcrumb-item active">Orders</span>
            </div>
        </div>
        <section className="static about-sec">
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <Sidebar />
                    </div>
                    <div className="col-10">
                    {loadingOrders ? <div>Loading...</div> :
                          errorOrders ? <div>{errorOrders} </div> :
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>DATE</th>
                                  <th>TOTAL</th>
                                  <th>PAID</th>
                                  <th>ACTIONS</th>
                                </tr>
                              </thead>
                              <tbody>
                                {orders.map(order => <tr key={order._id}>
                                  <td>{order._id}</td>
                                  <td>{order.createdAt}</td>
                                  <td>{order.totalPrice}</td>
                                  <td>{order.isPaid}</td>
                                  <td>
                                    <Link to={"/order/" + order._id}>DETAILS</Link>
                                  </td>
                                </tr>
                                )}
                              </tbody>
                            </table>
                    }
                    </div>
                </div>    
            </div>
        </section>
    </>
  );
}

export default MyOrdersScreen;