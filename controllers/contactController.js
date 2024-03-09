const asyncHandler = require("express-async-handler");
const Contact=require("../models/contactModel")

//@desc Get all contacts
//@route GET /api/contacts
//access private

const getContacts =asyncHandler(async (req, res) => {

  const contacts=await Contact.find({userId:req.user.id})
  res.status(200).json(contacts);
});


//@desc get one contact
//@route GET /api/contacts/:id
//access private
const getContact = asyncHandler(async (req, res) => {
  const contact =await Contact.findById(req.params.id)
  if(!contact){
    res.status(404)
    throw new Error("Contact not found ")
}

  res.status(200).json(contact);
});

//@desc create new contacts
//@route POST /api/contacts
//access private

const createContact = asyncHandler( async (req, res) => {
  // console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory ..");
  } 
  const contact=await Contact.create({
    userId:req.user.id,
    name,
    email,
    phone
  })
  res.status(201).json(contact);
});

//@desc update contacts
//@route PUT /api/contacts/:id
//access private

const updateContact = asyncHandler(async (req, res) => {
   const contact = await Contact.findById(req.params.id);
   if (!contact) {
     res.status(404);
     throw new Error("Contact not found ");
   }
   if(contact.userId.toString()!==req.user.id){
    res.status(403)
    throw new Error('user dont have permission to update')
   }

   const updatedContact= await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
   )
  res.status(201).json(updatedContact);
});

//@desc delete contacts
//@route DELETE /api/contacts
//access private

const deleteContact = asyncHandler(async (req, res) => {

     const contact = await Contact.findById(req.params.id);
     if (!contact) {
       res.status(404);
       throw new Error("Contact not found ");
     }
        if (contact.userId.toString() !== req.user.id) {
          res.status(403);
          throw new Error("User dont have permission to update contact");
        }

  await Contact.remove({ id: req.params.id });
  res.status(200).json(contact);
});

module.exports = { 
    getContact,
    getContacts,
    createContact,
    updateContact,
    deleteContact 
};