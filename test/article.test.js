/**
 * Created by MingYin Lv on 2017/2/18 下午9:21.
 */

import mongoose from 'mongoose';
import {
  findById,
  findList,
  addArticle,
  deleteById,
  updateArticle,
  updateArticleById
} from '../src/service/ArticleService';
import { expect } from 'chai';

describe('文章接口测试', function () {

  describe('文章查询接口', function () {

    let articleId = null;

    // 添加一条数据
    before(function (done) {
      addArticle({
        title: `测试文章`, // 文章标题
        content: '测试文章内容', // 文章内容
        publishDate: new Date(), // 发布时间
        updateDate: new Date(), // 最后更新时间
        author: '吕铭印', // 作者
        tag: 'JavaScript',  // 文章标签
        type: mongoose.Types.ObjectId('58a8593551b1f10c87b8f08e'),
        accessTotal: 10, // 访问统计
      }).then(function ({ result }) {
        articleId = result._id;
        done();
      }).catch(function (err) {
        throw err;
      });
    });

    it('文章列表接口测试', function (done) {
      findList({ keyword: '测试文章' })
        .then(function (articles) {
          // 返回数组
          expect(articles).to.be.a('Array');
          // 长度大于0
          expect(articles.length).to.have.above(0);
          done();
        })
        .catch(function (err) {
          throw err;
        });
    });

    it('查询单条文章接口', function (done) {
      findById(articleId)
        .then(function (articles) {
          // 数据正确
          expect(articles.title).to.equal('测试文章');
          done();
        })
        .catch(function (err) {
          throw err;
        });
    });

    it('修改文章接口', function (done) {
      updateArticle({
        title: '测试文章',
      }, {
        content: '这是修改后的内容',
      }).then(function (result) {
        // 受影响的行数
        expect(result.n).to.equal(1);
        done();
      }).catch(function (err) {
        throw err;
      });
    });

    // 删除添加的数据
    after(function (done) {
      deleteById(articleId)
        .then(function () {
          done();
        })
        .catch(function (err) {
          throw err;
        });
    });
  });
});
