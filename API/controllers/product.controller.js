const Product = require("../models/product.model");

// Create new Product
exports.create = (req, res) => {
  // Request validation
  if (!req.body) {
    return res.status(400).send({
      message: "Product can not be empty"
    });
  }

  // Create a product
  const product = new Product({
    title: req.body.title || "No product title",
    description: req.body.description,
    price: req.body.price,
    company: req.body.company
  });

  //save product in the database
  product
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the product."
      });
    });
};
//-------------------------------------------------//

// Get all product
exports.findAll = (req, res) => {
    Product.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });
};

//-------------------------------------------------//

//get one product with a productId
exports.findOne = (req, res) => {
  Product.findById(req.params.productId)
    .then(product => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId
        });
      }
      res.send(product);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId
        });
      }
      return res.status(500).send({
        message:
          "Something wrong retrieving product with id " + req.params.productId
      });
    });
};

//-------------------------------------------------//

// Update a product
exports.update = (req, res) => {
  // validation request
  if (!req.body) {
    return res.status(400).send({
      message: "Product content can not be empty"
    });
  }
  // find and update product with the request body
  Product.findByIdAndUpdate(
    req.params.productId,
    {
      title: req.body.title || "No product title",
      description: req.body.description,
      price: req.body.price,
      company: req.body.company
    },
    { new: true }
  )
    .then(product => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId
        });
      }
      res.send(product);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId
        });
      }
      return res.status(500).send({
        message: "Something wrong updating note with id " + req.params.productId
      });
    });
};
//-------------------------------------------------//

//Delete a product
exports.delete = (req, res) => {
  Product.findByIdAndDelete(req.params.productId)
    .then(product => {
      if (!product) {
        return res.status(400).send({
          message: "Product not found with id " + req.params.productId
        });
      }
      res.send({ message: "Product deleted " });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId
        });
      }
      return res.status(500).send({
        message: "Could not delete product with id " + req.params.productId
      });
    });
};
