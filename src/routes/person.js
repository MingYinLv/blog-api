/**
 * Created by MingYin Lv on 2017/2/19 下午9:00.
 */

import { Router } from 'express';
// import { checkLogin } from '../middleware/check';
import { login } from '../service/PersonService';
import { success, failed } from '../util/responseTemplate';

const router = Router();

//
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  login({ username, password })
    .then((result) => {
      if (result) {
        req.session.user = result;
        res.json(success({}, '登陆成功'));
      } else {
        res.json(failed('登陆失败, 用户名或密码错误。'));
      }
    })
    .catch(() => {
      res.json(failed('登陆失败, 请稍候再试。'));
    });
});

export default router;
