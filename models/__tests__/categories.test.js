'use strict';

const Categories = require('../categories.js');

describe('Categories', () => {

  let categories;

  beforeEach(() => {
    categories = new Categories();
  });

  it('Post() a new categories', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('get() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        return categories.get(record._id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(category[0][key]).toEqual(obj[key]);
            });
          });
      });
  });
  it('update() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        record.name = 'Test for update category';
        return categories.update(record._id,record)
          .then(category => {
            return categories.get(category._id)
              .then(category=>{
              // console.log(category)
                Object.keys(obj).forEach(key => {
                  expect(category[0][key]).toEqual(obj[key]);
                });
              });
          });
      });
  });
  it('delete() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        return categories.get(record._id)
          .then(category => {
            return categories.delete(category._id)
              .then(category=>{
              // console.log(category)
                expect(category).toEqual(undefined);
              });
          });
      });
  });
});