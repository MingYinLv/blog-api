/**
 * Created by MingYin Lv on 2017/2/19 下午4:05.
 */

export default (req, res, next) => {
  next();
  res.set({
    'Access-Control-Allow-Origin': 'http://blog-admin.lvmingyin.com',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': 'x-requested-with,content-type',
    'Content-Type': 'application/json; charset=utf-8',
  });
};
