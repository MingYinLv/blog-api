/**
 * Created by MingYin Lv on 2017/2/18 下午8:01.
 */

import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from './config';
import routes from './routes';
import pkg from '../package.json';
import { checkRefer } from './middleware/check';
import setHeader from './middleware/setHeader';

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(checkRefer);
app.use(setHeader);

// session
app.use(session({
  sessionId: config.session.key, // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  cookie: {
    maxAge: config.session.maxAge, // 过期时间
  },
}));

// 注册路由
routes(app);

app.listen(config.port, () => {
  console.log(`${pkg.name} listening on port ${config.port}`);
});
