const Product = require('../models/product');

// Retrieve all Products
exports.getProducts = (req, res) => {
  const offset = req.query.offset;
  const startDate = req.query.start_date;
  const endDate = req.query.end_date;

  Product.getAll({ offset, startDate, endDate }, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
        status: false,
      });
      
    //res.send({ data, status: true });
    setTimeout(()=>res.send({ data, status: true }),1000);

  });
};

// Create and Save a new Product
exports.saveProduct = (req, res) => {
  // Create a Product
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  // Save Product in the db
  Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
        status: false,
      });
    else res.send({ data, status: true, message: 'Product has been saved successfully' });
  });
};
