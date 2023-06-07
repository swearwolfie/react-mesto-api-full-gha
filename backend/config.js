require('dotenv').config()

const { JWT_SECRET = 'some-secret-key' } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

module.exports = {
  JWT_SECRET,
  DB_ADDRESS,
};