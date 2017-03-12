/**
 * Created by MingYin Lv on 2017/2/19 下午3:02.
 */

export const noLoginJSON = Buffer.from(JSON.stringify({
  error_code: 4,
  msg: '请登陆',
}));

export const checkLogin = (req, res, next) => {
  if (!req.session.user) {
    res.set('Content-Type', 'application/json; charset=utf-8');
    res.end(noLoginJSON);
    return;
  }
  next();
};
export const checkRefer = (req, res, next) => {
  // if (req.headers.Referer !== 'blog.lvmingyin.com') {
  //   res.end('呵呵');
  //   return;
  // }
  next();
};
