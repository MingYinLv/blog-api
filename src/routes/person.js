/**
 * Created by MingYin Lv on 2017/2/19 下午9:00.
 */

import { Router } from 'express';
import { checkLogin } from '../middleware/check';
import { login, update } from '../service/PersonService';
import { success, failed } from '../util/responseTemplate';
import { noLoginJSON } from '../middleware/check';

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

router.post('/update', checkLogin, (req, res) => {
  const { password, sex, age, photo, email, company } = req.body;
  update({
    _id: req.session.user._id,
  }, {
    password, sex, age, photo, email, company,
  }).then((result) => {
    if (result.n > 0) {
      res.json(success('修改成功'));
    } else {
      res.json(failed('修改失败'));
    }
  });
});

router.get('/check', (req, res) => {
  if (req.session.user) {
    res.json(success({}, '已登陆'));
  } else {
    res.end(noLoginJSON);
  }
});

export default router;
