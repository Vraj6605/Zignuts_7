const User = require("../models/userModel"); 

const allUser = async (req,res) => {
  const allUser = await User.find({});
  res.json(allUser); 
}

const userwithId = async (req,res) => {
  let { id } = req.params;
  const user = await User.findById(id);
  res.json(user); 
}

const userCreate = async (req,res) =>{
  const newUser = await User.create({...req.body})
  res.json(newUser);
}

const userDelete = async (req,res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({"info" : "Data Deleted Successfully"})
}

const userEdit = async (req,res) => {
  await User.findByIdAndUpdate(req.params.id,{...req.body});
  res.json({"info" : "Data Edited Successfully"})
}

module.exports = {
  allUser,userwithId,userCreate,userDelete,userEdit
}