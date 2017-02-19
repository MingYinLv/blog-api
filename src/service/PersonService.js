/**
 * Created by MingYin Lv on 2017/2/18 下午7:49.
 */

import encrypt from '../util/encrypt';
import { PersonModel } from '../DB';

/**
 * 用户登陆
 * @param username 用户名
 * @param password 密码
 * @returns {Promise}
 */
export const login = ({ username, password }) => {
  return PersonModel.find({
    username,
    password: encrypt(password),
  }).exec();
};
