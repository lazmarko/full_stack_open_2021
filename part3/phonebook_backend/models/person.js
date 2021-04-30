const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


// const url = process.env.MONGODB_URI;
const url = 'mongodb+srv://fullstack:wordpass123@cluster0.5fvsz.mongodb.net/phonebook?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true,
    unique: true,
    minlength: 3
  },
  number: {
    type: String,
    required:true,
    unique: true,
    validate: {
      validator: (v) => /^\d{8,}$/.test(v),
      message: props => 'Phone number has to be at least 8 digit'
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
personSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Person', personSchema)