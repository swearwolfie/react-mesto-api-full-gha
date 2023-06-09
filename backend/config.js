require('dotenv').config();
 const { JWT_SECRET = 'JWT_SECRET' } = process.env;
 const { DB_ADDRESS = 'DB_ADDRESS' } = process.env;
 const { NODE_ENV = 'NODE_ENV' } = process.env

 module.exports = {
  JWT_SECRET,
  DB_ADDRESS,
  NODE_ENV
 };
