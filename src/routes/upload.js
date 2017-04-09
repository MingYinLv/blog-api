/**
 * Created by MingYin Lv on 2017/4/9 上午11:17.
 */

import { Router } from 'express';
import multiparty from 'multiparty';
import fs from 'fs';
import util from 'util';
import path from 'path';
import { checkLogin, noLoginJSON } from '../middleware/check';
import { success, failed } from '../util/responseTemplate';

const router = Router();
router.get('/', (req, res) => {
  res.json(success({}));
});
router.post('/', (req, res) => {
  console.log(1);
  const form = new multiparty.Form({ uploadDir: path.join(__dirname, '../public/upload') });
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log('parse error: ', err);
    } else {
      res.json(success({ url: `/upload/${path.parse(files.uploadFile[0].path).base}` }, '上传成功'));
    }
  });
});

export default router;
