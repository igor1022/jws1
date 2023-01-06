const  mongoose  = require('mongoose');
const { Schema } = mongoose;

const generalSchema = new Schema ({
    name: {
        type: Schema.Types.String,
        minLenght: 2,
        required: true
    },
    surname: {
        type: Schema.Types.String,
        minLenght: 2,
        required: true
    },
    username: {
        type: Schema.Types.String,
        minLenght: 2,
        required: true
    },
    email: {
        type: Schema.Types.String,
        minLenght: 2,
        required: true
    },
    password: {
        type: Schema.Types.String,
        minLenght: 2,
        required: true
    },
})

const model = mongoose.model('Register', generalSchema);
module.exports = model;