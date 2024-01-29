const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModels");
const app = express();

// middleware

app.use(express.json());

// add middleware whane add the data in postma form data url
// app.use(express.urlencoded({ extended: false }));

// routes

app.get("/", (req, res) => {
  res.send("Hello node api yyy");
});
app.get("/blog", (req, res) => {
  res.send("Hello node blog route");
});

app.listen(3000, () => {
  console.log(`Node api is running on port 3000`);
});

// get all the   data from database

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get  products by id

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findById({ _id: id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
  // console.log(req.body);
  // res.send(req.body);
});

// update the product
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    // we can not find product
    if (!product) {
      return res
        .status(404)
        .json({ message: `can not find any product withID ${id}` });
    }
    const updateProduct = await Product.findById(id);

    res.status(200).json(updateProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// delete a product

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id, req.body);
    if (!product) {
      return res
        .status(404)
        .json({ message: `can not find any product withID ${id}` });
    }
    // const updateProduct = await Product.findById(id);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// connect mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/productDetails")
  .then(() => console.log("Connected!"))
  .catch((error) => {
    console.log("err", error);
  });
