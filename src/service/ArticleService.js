/**
 * Created by MingYin Lv on 2017/2/18 下午7:26.
 */

import mongoose from 'mongoose';
import { ArticleModel } from '../DB';
import Promise from 'bluebird';

/**
 * 根据id查找文章
 * @param id
 * @returns {Promise}
 */
export const findById = (id) => {
  return ArticleModel.findOne({ _id: mongoose.Types.ObjectId(id) }).exec();
};

export const deleteById = (id) => {
  return ArticleModel.remove(new ArticleModel({ _id: mongoose.Types.ObjectId(id) })).exec();
};

/**
 * 查找文章列表
 * @param [keyword] 关键字
 * @param [page] 页码
 * @param [size] 数量
 */
export const findList = ({ keyword = '', page = 1, size = 10 }) => {
  const reg = new RegExp(keyword, 'i');
  return ArticleModel.find()
    .or([{
      title: reg,
    }, { content: reg }, { tag: reg }])
    .skip((page - 1) * size)
    .limit(size).exec();
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

export const updateArticleById = (doc) => {
  const { _id, ...article } = doc;
  ArticleModel.update({ _id: mongoose.Types.ObjectId(_id) }, {
    ...article,
  }).exec();
};

export const updateArticle = (query, doc) => {
  return ArticleModel.update(query, doc).exec();
};
