/**
 * Created by MingYin Lv on 2017/3/6 下午9:24.
 */

const deleteById = require('../src/service/ArticleService').deleteById;

deleteById('123451234512')
  .then(function (args) {
    console.log(args);
  })
  .catch(function (err) {
    throw err;
  });
