var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_schema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


// create a model and make this available to our Node applications
module.exports = mongoose.model('User', user_schema);
