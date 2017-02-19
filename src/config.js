/**
 * Created by MingYin Lv on 2017/2/18 下午8:05.
 */

export default {
  port: process.env.port || 3030,
  session: {
    secret: 'blog',
    key: 'blog',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 保存一个月
  },
};
