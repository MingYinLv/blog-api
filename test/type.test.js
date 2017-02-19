/**
 * Created by MingYin Lv on 2017/2/19 下午5:31.
 */

import mongoose from 'mongoose';
import {
  findById,
  findList,
  addType,
  deleteById,
  updateTypeById
} from '../src/service/TypeService';
import { expect } from 'chai';

describe('类型接口测试', function () {

  describe('查询接口', function () {
    let typeId = null;
    before(function (done) {
      addType({
        name: '测试类型'
      }).then(function ({ result }) {
        typeId = result._id;
        done();
      }).catch(function (err) {
        throw err;
      })
    });

    it('查询类型列表', function (done) {
      findList({})
        .then(function (types) {
          // 返回数组
          expect(types).to.be.a('Array');
          // 长度大于0
          expect(types.length).to.have.above(0);
          done();
        })
        .catch((function (err) {
          throw err;
        }));
    });

    it('查询单个类型', function (done) {
      findById(typeId)
        .then(function (type) {
          expect(type.name).to.equal('测试类型');
          done();
        })
        .catch(function (err) {
          throw err;
        })
    });

    it('修改类型接口', function (done) {
      updateTypeById({
        _id: typeId,
        name: '这是修改后的类型',
      }).then(function (result) {
        // 受影响的行数
        expect(result.n).to.equal(1);
        done();
      }).catch(function (err) {
        throw err;
      });
    });

    after(function (done) {
      deleteById(typeId)
        .then(function () {
          done();
        }).catch(function (err) {
        throw err;
      });
    });

  })

});
