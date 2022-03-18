const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI

mongoose.connect(url, err => {
    if(err) throw err;
    console.log('connected to MongoDB')
  });

const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3
    },
    number: {
        type: String,
        minlength: 8
    },
    color: {
      type: String
    }
  })
  
  phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('PhoneNumber', phoneSchema)