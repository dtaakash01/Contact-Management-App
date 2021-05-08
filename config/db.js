const mongoose = require('mongoose');
const config = require('config');
const db = config.get('MongoURI');

const connectDB  = () => {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true
    }).then(() => console.log('DATABASE Connection Established...'))
    .catch(err => {
        console.error(err.message);
        process.exit(1);
    })
};

module.exports = connectDB;