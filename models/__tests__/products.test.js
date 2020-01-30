'use strict';

const products = require('../products.js');

describe('Products Model', () => {

  it('post() a new product', () => {
    let product = new products();
    let obj = { price: 4, quantity_in_stock: 500 };
    return product.create(obj)
      .then(record => {
        console.log(record);
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      }).catch(e => console.error('ERR', e));
  });
  it('get() a product', () => {
    let product = new products();
    let obj = { price: 2, quantity_in_stock: 300 };
    return product.create(obj)
      .then(record => {
        return product.get(record._id)
          .then(prod => {
            console.log(prod);
            Object.keys(obj).forEach(key => {
              expect(prod[0][key]).toEqual(obj[key]);
            });
          });
      });
  });
  it('update() a product', () => {
    let product = new products();
    let obj = { price: 2, quantity_in_stock: 300 };
    return product.create(obj)
      .then(record => {
        record.price = 10;
        record.quantity_in_stock = 1000;
        return product.update(record._id, record)
          .then(category => {
            return product.get(category._id)
              .then(category => {
                console.log(category);
                Object.keys(obj).forEach(key => {
                  expect(category[0][key]).toEqual(obj[key]);
                });
              });
          });
      });
  });
  it('delete() a product', () => {
    let product = new products();
    let obj = { price: 2, quantity_in_stock: 300 };
    return product.create(obj)
      .then(record => {
        return product.get(record._id)
          .then(prod => {
            return product.delete(prod._id)
              .then(record => {
                console.log(record);
                expect(record).toEqual(undefined);
              });
          });
      });
  });
});