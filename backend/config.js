import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://5Vi0zTnVsxVgnXVS:5Vi0zTnVsxVgnXVS@cluster0.lj5e9.mongodb.net/book_store?retryWrites=true&w=majority',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
  accessKeyId: process.env.accessKeyId || 'AKIAJNP7VMAEZ666DQ3Q',
  secretAccessKey: process.env.secretAccessKey || ' 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',
};
