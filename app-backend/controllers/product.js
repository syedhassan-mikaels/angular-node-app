const moment = require('moment');
const { Product } = require('../models');
const { responseError, responseSuccess } = require('../services/util.service');
const APP_CONFIG = require('../config/app');
const Sequelize = require('sequelize');

// Retrieve all Products
exports.getProducts = (req, res) => {
  const offset = +req.query.offset || 1;
  const startDate = req.query.start_date;
  const endDate = req.query.end_date;
  const pageSize = APP_CONFIG.pageSize;
  const where = {};

  if (startDate) where.created_at = { [Sequelize.Op.gte]: startDate };
  if (endDate)
    where.created_at = { ...where.created_at, [Sequelize.Op.lte]: endDate };

  Product.findAll({
    where: where,
    offset: (offset - 1) * pageSize,
    limit: pageSize,
    order: [
      ['created_at', 'DESC'],
      ['id', 'DESC'],
    ],
  })
    .then(async (products) => {
      const records = products;
      // Get product count
      const totalRecords = await Product.count({ where: where });
      const pageCount =
        Math.floor(totalRecords / pageSize) +
        (totalRecords % pageSize > 0 ? 1 : 0);
      return responseSuccess(res, {
        records,
        totalRecords,
        pageCount,
        pageSize,
      });
    })
    .catch((err) => responseError(res, err));
};

// Create and Save a new Product
exports.saveProduct = (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  Product.create({
    name: req.body.name,
    price: req.body.price,
    created_at: moment().format('yy-MM-DD')
  })
    .then((product) =>
      responseSuccess(res, product, 'Product has been saved successfully')
    )
    .catch((err) => responseError(res, err));
};
