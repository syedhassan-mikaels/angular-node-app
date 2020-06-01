const request = require('supertest');
const app = require('../app');

describe('Product Endpoints', () => {
  it('Should create a new product', async () => {
    const res = await request(app).post('/product/save').send({
      name: 'Basket',
      price: 50.99
    });  
    expect(res.statusCode).toEqual(200);
  });
  
  it('Should fetch products', async () => {
    const res = await request(app).get('/product/list');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data.records');
  });
});
