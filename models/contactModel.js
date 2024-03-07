const mongoose=require('mongoose')
const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add the contact name"],
  },
  email: {
    type: String,
    required: [true, "Please add the email Address"],
  },
  phone: {
    type: String,
    required: [true, "Please add the Phonenumber"],
  },
},
    {
        timestamps:true
    }
);

module.exports=mongoose.model('Contact',contactSchema)