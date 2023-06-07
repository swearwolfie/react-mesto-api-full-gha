require('dotenv').config();
 const { JWT_SECRET = 'some-secret-key' } = process.env;
 const { DB_ADDRESS = 'DB_ADDRESS' } = process.env;

 module.exports = {
  JWT_SECRET,
  DB_ADDRESS,
 };
