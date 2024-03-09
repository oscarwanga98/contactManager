const mongoose=require('mongoose')
const contactSchema = mongoose.Schema(
  {
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'User'
    },
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