/**
 * Created by MingYin Lv on 2017/2/19 下午5:25.
 */


import mongoose from 'mongoose';
import Promise from 'bluebird';
import { TypeModel } from '../DB';

/**
 * 根据id查找类型
 * @param id
 * @param fields
 * @returns {Promise}
 */
export const findById = (id, fields = '-__v') => {
  return TypeModel.findOne({ _id: mongoose.Types.ObjectId(id) }, fields).exec();
};

/**
 * 查找类型列表
 * @param keyword
 * @param page
 * @param size
 * @param fields
 * @returns {Promise}
 */
export const findList = ({ keyword = '', page = 1, size = 10 }, fields = '-__v') => {
  const reg = new RegExp(keyword, 'i');
  return TypeModel.find({ name: reg }, fields)
    .skip((page - 1) * size)
    .limit(size)
    .exec();
};

/**
 * 添加一个类型
 * @param type 类型对象
 * @returns {Promise}
 */
export const addType = (type) => {
  return new Promise((resolve, reject) => {
    const typeEntity = new TypeModel(type);
    typeEntity.save((err, result, numberAffected) => {
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
 * 删除类型
 * @param id 类型id
 * @returns {Promise}
 */
export const deleteById = (id) => {
  return TypeModel.remove(new TypeModel({ _id: mongoose.Types.ObjectId(id) })).exec();
};

/**
 * 根据id更新类型
 * @param doc
 */
export const updateTypeById = (doc) => {
  const { _id, ...type } = doc;
  return TypeModel.update({ _id: mongoose.Types.ObjectId(_id) }, {
    ...type,
  }).exec();
};

