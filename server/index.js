const port = 4000;
const express = require("express");
const app = express();
const mongoose = require ("mongoose")
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
require("dotenv").config()
const cors = require("cors");
app.use(express.json());
app.use(cors());

// Database connection with mongodb
const mongooseUri = process.env.MONG_DB_URI;
mongoose.connect(mongooseUri)
.then((res)=>{
  console.log('mongoose has connected');
  // console.log(res);  
})
.catch((err)=>{
  console.log('Mongoose refuse to connect');
  console.error('MongoDB connection error:', err)
})


// // for the sake of the deploy fe&be
// app.get("/*", (req, res)=>{
//       res.sendFile(__dirname+"/build/index.html")
//   })
  
 
  
  // API Creation (Api endpoint)
  app.get("/api", (req, res)=>{
      res.json({message:"Cloth Express App is Running"})
  })
  // Image Storage Engine function
  const storage = multer.diskStorage({
    destination: './upload/images',
  filename:(req,file,cb)=>{
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
}) 

// Upload function
const upload = multer({storage:storage})


// Creating Upload Endpoint for images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single("product"), (req, res) => {
  const protocol = req.protocol;
  const host = req.get("host");

  res.json({
    success: 1,
    image_url: `${protocol}://${host}/images/${req.file.filename}`,
  });
});

// app.post("/upload", upload.single('product'),(req, res)=>{
//   res.json({
//     success:1,
//     image_url:`http://localhost:${port}/images/${req.file.filename}`
//   })
// });

// Schema for Creating Products

const Product = mongoose.model("Product", {
  id:{
    type: Number,
    required: true
  },
  name:{
    type: String,
    required:true,
  },
  image:{
    type: String,
    required:true
  },
  category:{
    type: String,
    required:true
  },
  new_price:{
    type: Number,
    required:true
  },
  old_price:{
    type: Number,
    required:true
  },
  date:{
    type: Date,
    default: Date.now
  },
  available:{
    type: Boolean,
    default: true
  }
})

app.post('/addproduct', async (req, res)=>{
  let products = await Product.find({});
  let id;
   if(products.length>0){
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0]
    id = last_product.id+1;
   } 
   else{
    id = 1;
   };
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  }); 
  console.log(product);
  await product.save();
  console.log("Saved")
  res.json({
    success: true,
    name:req.body.name,
  });
});

// Creating API for deleting Products

app.post('/removeproduct', async (req, res)=>{
  await Product.findOneAndDelete({id:req.body.id});
  console.log("Removed");
  res.json({
    success: true,
    name:req.body.name
  })
});

// Creating API for getting all products
app.get('/allproducts', async (req, res)=>{
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.json({data:products})
})

// Schema for Creating Users
const Users = mongoose.model("User",{
  name:{
    type:String,
  },
  email:{
    type:String,
    unique:true,
  },
  password:{
    type:String,
  },
  cartData:{
    type:Object,
  },
  date:{
    type:Date,
    default:Date.now,
  }
});


//Creating Endpoint for registering the user
app.post('/signup', async (req, res)=>{
  
  let check = await Users.findOne({email:req.body.email})

  if(check){
    return res.status(400).json({
      success:false,
      errors:"Existing user found with same email address"
    })
  }

  let cart = {};
  for (let i = 0; i < 300; i++){
    cart[i]=0;
  };

  const user = new Users({
    name:req.body.username,
    email:req.body.email,
    password:req.body.password,
    cartData:cart,
  });

// console.log(user);

  await user.save()
  
  const data = {
    user:{
      id:user.id
    }
  }

  const token = jwt.sign(data, 'secret_ecom');
  res.json({success:true, token})
  // console.log(data);  
})

//Creating endpoint for user login
app.post('/login', async (req, res)=>{
  let user = await Users.findOne({email:req.body.email});
  console.log(user);
  
  if(user){
    const passCompare = req.body.password === user.password;
    if(passCompare){
      const data = {
        user:{
          id:user.id
        }
      }
      const token = jwt.sign(data, 'secret_ecom');
      
      // console.log(data);
      res.json({success:true, token})
    }else{
      res.json({success:false, errors:"Wrong Password"})
    }
  }else{
    res.json({success:false, errors:"Wrong Email Id"})
  }
})

// Creating endpoint for newcollection data
app.get('/newcollections', async (req, res)=>{
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("New collection Fetched");
  res.json({data:newcollection})
})

// Creating endpoint for popular in women in woman section
app.get('/popularinwoman', async (req, res)=>{
  let products = await Product.find({category:'woman'})
  let popular_in_women = products.slice(0,4);
  console.log("Popular in women fetch");
  res.json({data:popular_in_women})
})

// creating middleware to fetch user
const fetchUser = async (req, res, next)=>{
  const token = req.header('auth-token')
  if(!token){
    res.status(401).send({
      errors:"Please authenticate using valid token" })
  }else{
    try{
      const data = jwt.verify(token, 'secret_ecom');
      req.user = data.user;
      console.log(data)
      next();
    } catch(err){
      res.status(401).send({errors:"please authenticate using valid token"});
    }
  }
}

// Creating endpoint for adding product in cartdata
app.post('/addtocart', fetchUser, async (req, res)=>{
  // console.log(req.body + "finish here", req.user);
  console.log("Addded", req.body.itemId)
  let userData = await Users.findOne({_id:req.user.id});
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
  res.json({message:"Added"})
  // console.log(userData);
})

// Creating endpoint for remove from cartdata
app.post('/removefromcart', fetchUser, async (req, res)=>{
  console.log("removed", req.body.itemId)
  let userData = await Users.findOne({_id:req.user.id});
  if(userData.cartData[req.body.itemId]>0){
    userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
  res.json({"message":"Removed"})
  }
})

// creating endpoint to get cartdata 
app.post('/getcart', fetchUser, async (req, res)=>{
  console.log('getCart');
  let userData = await Users.findOne({_id:req.user.id})
  res.json({data:userData.cartData})
})

 
// Serve static React app (main frontend)
app.use(express.static(path.join(__dirname, "../client/build")));

// Serve static admin dashboard
app.use("/admin", express.static(path.join(__dirname, "../admin-banner/dist")));

// Catch-all for main React app
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Catch-all for admin dashboard
app.get("/admin/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../admin-banner/dist/index.html"));
});
// const fs = require("fs");
// const buildPath = path.join(__dirname, "../frontend/build/index.html");

// if (!fs.existsSync(buildPath)) {
//   console.error("❌ Build not found. Did you run `npm run build` in frontend?");
//   process.exit(1);
// }

app.listen(port, (error)=>{
  if(!error){
    console.log("Server Running on port" + port);
  }
  else
  {
    console.log("Error :" +error);
   }
})
// module.exports = app;