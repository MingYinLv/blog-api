/**
 * Created by MingYin Lv on 2017/2/19 下午9:27.
 */

import mongoose from 'mongoose';
import {
  login
} from '../src/service/PersonService';
import { expect } from 'chai';

describe('用户接口测试', function () {
  describe('登陆', function () {
    it('登陆', function (done) {
      login({
        username: 'lvmingyin',
        password: '6c3af47629272a91f76057f84ccc4b68',
      }).then((result) => {
        expect(result.username).to.equal('lvmingyin');
        done();
      }).catch((err) => {
        throw err;
      });
    })
  });
});
