const moment = require('moment');
const sql = require('./index');
const appConfig = require('../config/app');

const Product = function (product) {
  this.name = product.name;
  this.price = product.price;
  this.created_at = moment().format('yy-MM-DD');
};

Product.create = (newProduct, result) => {
  sql.query('INSERT INTO product SET ?', newProduct, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('Created product: ', { id: res.insertId, ...newProduct });
    result(null, { id: res.insertId, ...newProduct });
  });
};

Product.getAll = async (params = {}, result) => {
  const offset = params.offset || 1;
  const startDate = params.startDate && `'${params.startDate}'` || null;
  const endDate = params.endDate && `'${params.endDate}'` || null;
  const pageSize = appConfig.pageSize;
  const skip = (offset - 1) * pageSize;
  const limit = `${skip} , ${pageSize}`;
  const whereClause = `WHERE IF(${startDate},created_at >=${startDate},1=1) AND 
                       IF(${endDate},created_at <=${endDate},1=1)`;
  const data = {
    records: [],
    totalRecords: 0,
    pageCount: 0,
    pageSize: pageSize,
  };

  sql.query(
    `SELECT * FROM product ${whereClause} ORDER BY created_at DESC,id DESC LIMIT ${limit} `,
    (err, res) => {
      if (err) {
        result(null, err);
      } else {
        data.records = res;
        sql.query(
          `SELECT COUNT(*) as product_count FROM product ${whereClause}`,
          (err, res) => {
            if (err) {
              result(null, err);
              return;
            }
            data.totalRecords = res.length > 0 ? res[0].product_count : 0;
            data.pageCount =
              Math.floor(data.totalRecords / pageSize) +
              (data.totalRecords % pageSize > 0 ? 1 : 0);
            result(null, data);
          }
        );
      }
    }
  );
};

Product.findById = async (productId, result) => {
  const test = sql.query(`SELECT * FROM product WHERE id = ${productId}`);
  const test2 = sql.query(`SELECT COUNT(*) FROM product`);

  Promise.all([test, test2]).then((data, data2) => {
    console.log(data);
    console.log(data2);
  });

  //console.log("test",JSON.parse(JSON.stringify((test.RowDataPacket)))

  //   sql.query(`SELECT * FROM product WHERE id = ${productId}`, (err, res) => {
  //     if (err) {
  //       console.log('error: ', err);
  //       result(err, null);
  //       return;
  //     }

  //     if (res.length) {
  //       result(null, res[0]);
  //       return;
  //     }

  //     result({ kind: 'not_found' }, null);
  //   });
};

module.exports = Product;
