/**
 * Created by MingYin Lv on 2017/2/18 下午7:26.
 */

import mongoose from 'mongoose';
import Promise from 'bluebird';
import { ArticleModel } from '../DB';

/**
 * 根据id查找文章
 * @param id
 * @param fields 查询的字段
 * @returns {Promise}
 */
export const findById = (id, fields = '-__v') => {
  return ArticleModel.findOne({ _id: mongoose.Types.ObjectId(id) }, fields).exec();
};

/**
 * 删除文章
 * @param id 文章id
 * @returns {Promise}
 */
export const deleteById = (id) => {
  return ArticleModel.remove(new ArticleModel({ _id: mongoose.Types.ObjectId(id) })).exec();
};

/**
 * 查找文章列表
 * @param [keyword] 关键字
 * @param [page] 页码
 * @param [size] 数量
 * @param fields 查询的字段
 */
export const findList = ({ keyword = '', page = 1, size = 10 }, fields = '-__v') => {
  const reg = new RegExp(keyword, 'i');
  return ArticleModel.find({}, fields)
    .or([{
      title: reg,
    }, { content: reg }, { tag: reg }])
    .skip((page - 1) * size)
    .limit(size)
    .exec();
};

/**
 * 保存一条文章
 * @param article 文章对象
 * @returns {Promise}
 */
export const addArticle = (article) => {
  return new Promise((resolve, reject) => {
    const articleEntity = new ArticleModel(article);
    articleEntity.save((err, result, numberAffected) => {
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
 * 根据id更新文章
 * @param doc
 */
export const updateArticleById = (doc) => {
  const { _id, ...article } = doc;
  ArticleModel.update({ _id: mongoose.Types.ObjectId(_id) }, {
    ...article,
  }).exec();
};

/**
 * 更新文章
 * @param query 更新条件
 * @param doc 更新内容
 * @returns {Promise}
 */
export const updateArticle = (query, doc) => {
  return ArticleModel.update(query, doc).exec();
};
