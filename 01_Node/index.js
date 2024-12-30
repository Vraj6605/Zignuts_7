const express = require("express");
const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");
const fs = require("fs");
const { log } = require("console");
const { type } = require("os");

const app = express();

// Connect Mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/api-app")
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => console.log(err));

// Schema
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  job_title: {
    type: String,
    required: true,
  },
});

// Model
const User = mongoose.model("user", userSchema);

// Middleware
app.use(express.urlencoded({ extended: false }));

// -------Check for not exist user------
// app.use("/user/:id", (req, res, next) => {
//   let id = req.params.id;

//   if (users.length > id) {
//     next();
//   } else {
//     res.json({ Error: "No User Exists" });
//   }
// });

app.get("/user",async (req, res) => {
  const allUser = await User.find({});
  res.json(allUser);
});

app.get("/user/:id", async (req, res) => {
  let { id } = req.params;
  // let user = users.find((user) => user.id == id);
  // let user = users.filter((user) => user.id == id);
  let user = await User.findById(id)
  res.json(user);
});

app.post("/user", async (req, res) => {
  const body = req.body;
  console.log(body);
  let data = await User.create({...body});
  console.log(data);
  
  res.send("User Created Successfully")
  // users.push({ id: users.length + 1, ...body });

  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, result) => {
  //   res.send("Create Route");
  // });
  console.log("User Created Successfully");
});

app.patch("/user/:id", async(req, res) => {

await User.findByIdAndUpdate(req.params.id,{...req.body})

res.send("Edited Successfully")

  // const user = users.find((user) => user.id == req.params.id);
  // const editUser = { ...user, ...req.body };
  // console.log(editUser);


  // editData = users.map((item) =>
  //   item.id == req.params.id ? (item = { ...item, ...editUser }) : item
  // );
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(editData), (err, result) => {
  //   res.send("Edit Route");
  // });
  
  console.log("User Edited Successfully");
});

app.delete("/user/:id", async(req, res) => {

  await User.findByIdAndDelete(req.params.id);
  res.send("Deleted Successfully")

  // let newData = users.filter((user) => user.id != req.params.id);
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(newData), (err, result) => {
  //   res.send("Delete Route");
  // });
  console.log("User Deleted Successfully");
});

app.listen(8080, () => {
  console.log("Server is Running on http://localhost:8080");
});

// -----------Part 1---------------

// const { log } = require("console");
// const fs = require("fs");
// const os = require("os");
// const express = require("express");
// const data = require("./data.json")

// Write File
// fs.writeFileSync("./Hello.txt","Hello")

// Read File
// const data = fs.readFileSync("./Hello.txt",'utf-8')
// console.log(data)

// ------------ OS Module -------------
// console.log("CPU core : " +os.cpus().length);
// console.log(os.platform());
// console.log(os.userInfo());
// console.log(os.hostname());
// console.log(os.version());
// console.log(os.networkInterfaces());
