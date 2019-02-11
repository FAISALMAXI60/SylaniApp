const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const blackListSchema = new Schema({
    cnic: {
        required: true, type: Number
    },
    note: {
        required: true, type: String
    }
});

let BlackListModal = mongoose.model('BlackListModal', blackListSchema)

module.exports = { BlackListModal };