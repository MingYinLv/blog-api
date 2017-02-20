/**
 * Created by MingYin Lv on 2017/2/20 下午7:39.
 */

import mongoose from 'mongoose';
import Promise from 'bluebird';

/**
 * 传入Model生成根据id查找的方法
 * @param Model
 */
export const findById = Model => (id, fields = '-__v') => {
  return Model.findOne({ _id: mongoose.Types.ObjectId(id) }, fields).exec();
};

/**
 * 传入Model生成根据id删除的方法
 * @param Model
 */
export const deleteById = Model => (id) => {
  return Model.remove(new Model({ _id: mongoose.Types.ObjectId(id) })).exec();
};

/**
 * 传入Model生成添加的方法
 * @param Model
 */
export const add = Model => (doc) => {
  return new Promise((resolve, reject) => {
    const entity = new Model(doc);
    return entity.save((err, result, numberAffected) => {
      if (err) reject(err);
      // 返回保存的内容和受影响的行数
      resolve({
        result,
        line: numberAffected,
      });
    });
  });
};

/**
 * 传入Model生成根据id生成的方法
 * @param Model
 */
export const updateById = Model => (doc) => {
  const { _id, ...other } = doc;
  return Model.update({ _id: mongoose.Types.ObjectId(_id) }, {
    ...other,
  }).exec();
};