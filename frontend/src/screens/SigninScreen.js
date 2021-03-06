import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';
import { useForm } from "react-hook-form";
import axios from 'axios';

function SigninScreen(props) {
  const { register, handleSubmit, errors } = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [verified, setVerified] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    var vUserId = props.match.params.id;
    if (userInfo) {
      props.history.push(redirect);
    }
    if (vUserId) {
        axios.post('/api/users/verify-email', {id:vUserId}).then((response) => {
            setVerified(response.data);
        }).catch((err) => {
          console.log(err);
        });
    }
    return () => {
      //
    };
  }, [userInfo, props, redirect]);

  const submitHandler = (e) => {
    dispatch(signin(email, password));

  }
  return (
        <>
            <div className="breadcrumb">
                <div className="container">
                    <a className="breadcrumb-item" href={process.env.PUBLIC_URL+"/"}>Home</a>
                    <span className="breadcrumb-item active">Sign In</span>
                </div>
            </div>
            <section className="static about-sec">
                <div className="container">
                    <div className="row">
                        <div className="offset-4 col-4">
                            <div className="form1">
    <form onSubmit={handleSubmit(submitHandler)}>
      <ul className="form-container">
        <li>
          <h2>Sign-In</h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div className="alert alert-danger">{error.message}</div>}
          {verified && <div className="alert alert-success">{verified.message}</div>}
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} ref={register({
                required: "This field is required",
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                  message: "Please enter valid email address"
                }
              })}>
          </input>
          {/* errors will return when field validation fails  */}
          <span className="text-danger">{errors.email?.message}</span>
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} ref={register({ required: true })}>
          </input>
          {errors.password && <span className="text-danger">This field is required</span>}
        </li>
        <li>
          <button type="submit" className="btn btn-primary btn-lg">Signin</button>
        </li>
        <li className="text-right">
            <Link to="/reset">Forgot password?</Link>
        </li>
        <li>
          New User?
        </li>
        <li>
          <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="btn btn-secondary text-center" >Create Account</Link>
        </li>
      </ul>
    </form>
  </div>
  </div>
  </div>
  </div>
  </section>
  </>
          );
}
export default SigninScreen;