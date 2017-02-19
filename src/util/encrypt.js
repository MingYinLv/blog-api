/**
 * Created by MingYin Lv on 2017/2/18 下午7:30.
 */

  // import crypto from 'crypto';
const crypto = require('crypto');

/**
 * 密码加密
 * @param password 密码原文
 * @returns {string} 加密后的字符串
 */
export default function (password) {
  const md5 = crypto.createHash('md5');
  md5.update(password);
  return md5.digest('hex').toString();
}
