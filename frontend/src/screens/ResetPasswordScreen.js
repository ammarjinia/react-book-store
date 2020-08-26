import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetUser } from '../actions/userActions';

function ResetPasswordScreen(props) {

  const [email, setEmail] = useState('');
  const userReset = useSelector(state => state.userReset);
  const { loading, success, error } = userReset;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetUser(email));
  }
   useEffect(() => {
       setEmail('');
  }, [success])
  return (
        <>
            <div className="breadcrumb">
                <div className="container">
                    <a className="breadcrumb-item" href={process.env.PUBLIC_URL+"/"}>Home</a>
                    <span className="breadcrumb-item active">Forgot Password</span>
                </div>
            </div>
            <section className="static about-sec">
                <div className="container">
                    <div className="row">
                        <div className="offset-4 col-4">
                            <div className="form1">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h3>Forgot Password</h3>
          <small>Enter your verified email address and we will send you a password reset link.</small>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div className="text-danger">{error.message}</div>}
          {success && <div className="text-success">Check your email for a link to reset your password.</div>}    
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email}>
          </input>
        </li>
        <li>
          <button type="submit" className="btn btn-primary btn-lg">Send Confirmation</button>
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
export default ResetPasswordScreen;