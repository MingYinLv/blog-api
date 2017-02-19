/**
 * Created by MingYin Lv on 2017/2/19 下午4:05.
 */

export default (req, res, next) => {
  next();
  res.set({
    'Content-Type': 'application/json; charset=utf-8',
  });
};
