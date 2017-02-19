/**
 * Created by MingYin Lv on 2017/2/18 下午8:05.
 */

export default {
  port: 3000,
  session: {
    secret: 'blog',
    key: 'blog',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 保存一个月
  },
  mongodb: 'mongodb://localhost:27017/blog',
};
