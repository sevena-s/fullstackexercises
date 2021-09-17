const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const pName = process.argv[3]
const pNumber = process.argv[4]

const url = `mongodb+srv://fullstacker:${password}@cluster0.fli8o.mongodb.net/test?retryWrites=true&w=majority`

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
      type: Number,
      minlength: 8
  }
})
phoneSchema.plugin(uniqueValidator);

const Phonenumber = mongoose.model('PhoneNumber', phoneSchema)

const phone = new Phonenumber({
  name: pName,
  number: pNumber,
})

if(process.argv.length < 4){
    Phonenumber.find({}).then(result => {
        console.log("PhoneBook:")
        result.forEach(phone => {
          console.log(phone.name, phone.number)
        })
        mongoose.connection.close()
      })
}
else{
phone.save().then(result => {
  console.log(`added ${pName} Number: ${pNumber} to phonebook`)
  mongoose.connection.close()
})
}

