import express from 'express';
import User from '../models/userModel';
import { getToken, isAuth, isAdmin } from '../util';

const router = express.Router();

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'info@gmail.com',
    pass: 'Password'
  }
});


router.put('/:id', isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    user.isVerified = req.body.isVerified || user.isVerified;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isVerified: updatedUser.isVerified,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});

router.post('/signin', async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinUser) {
    if (signinUser.isVerified == true)
    {    
        res.send({
          _id: signinUser.id,
          name: signinUser.name,
          email: signinUser.email,
          isAdmin: signinUser.isAdmin,
          isVerified: signinUser.isVerified,
          token: getToken(signinUser),
        });
    } else {
        res.status(401).send({ message: 'Your email is not verified, Please verify your email first.' });
    }
  } else {
    res.status(401).send({ message: 'Invalid Email or Password.' });
  }
});

router.post('/verify-email', async (req, res) => {
  var userId = req.body.id;
  const objUser = await User.findById(userId);
  if (objUser) {
    if (objUser.isVerified != true)
    {
        objUser.isVerified = true;
        const updatedUser = await objUser.save();
        res.status(200).send({ message: 'Your email is verified now!' });
    } else {
        res.status(401).send({ message: 'Your email is already verified.' });
    }
  } else {
    res.status(401).send({ message: 'Something went wrong!' });
  }
});

router.post('/resetuser', async (req, res) => {
  const resetUser = await User.findOne({
    email: req.body.email,
  });
  if (resetUser) {
    res.status(200).send({ message: "New Order Created"});
  } else {
    res.status(401).send({ message: 'Invalid Email' });
  }
});

router.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isVerified:false,
    isAdmin:false,
  });
  const chkUser = await User.findOne({
    email: req.body.email,
  });
  if (chkUser) {
      res.status(401).send({ message: 'Email Already Exist!' });
  } else {
    const newUser = await user.save();
    if (newUser) {
       var mailOptions = {
          from: 'info@gmail.com',
          to: newUser.email,
          subject: 'Book Store - Verify your account',
          html: '<h4>Hello '+newUser.email+'</h4><p>Please verify your account by clicking on this link <a href="http://127.0.0.1:3000/verify-email/'+newUser.id+'">http://127.0.0.1:3000/verify-email/'+newUser.id+'</a>'
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
         
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        isVerified: newUser.isVerified,
        token: getToken(newUser),
      });
    } else {
      res.status(401).send({ message: 'Invalid User Data.' });
    }
  }
});

router.get('/createadmin', async (req, res) => {
  try {
    const user = new User({
      name: 'Admin',
      email: 'admin@gmail.com',
      password: '123456',
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.get('/', async (req, res) => {
    
  const sortOrder = req.query.sortOrder
    ? req.query.sortOrder === 'lowest'
    : { _id: -1 };
  const users = await User.find().sort(
    sortOrder
  );
  res.send(users);
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedUser = await User.findById(req.params.id);
  if (deletedUser) {
    await deletedUser.remove();
    res.send({ message: 'User Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});


export default router;
