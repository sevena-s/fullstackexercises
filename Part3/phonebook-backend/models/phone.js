const mongoose = require('mongoose')

const url = `mongodb+srv://fullstacker:money@cluster0.fli8o.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, err => {
    if(err) throw err;
    console.log('connected to MongoDB')
  });

const phoneSchema = new mongoose.Schema({
    name: String,
    number: Number,
  })
  
  phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('PhoneNumber', phoneSchema)