const { default: mongoose } = require('mongoose');
const mon = require('mongoose');
const uri = 'mongodb://localhost:27017/jwtregister';
mongoose.set("strictQuery", false);
mongoose.connect(uri);

const db = mongoose.connection;

module.exports = db;

