
const mongoose = require('mongoose')
const url = process.env.MONGODB_URL;

mongoose.Promise = global.Promise;
// connect to database
const connection = mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Successfully connected to db')
}).catch(err => {
    console.log('Failed to connect to db. Error : '+err)
    process.exit();
})

module.exports = connection