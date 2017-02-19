/**
 * Created by MingYin Lv on 2017/2/18 下午8:09.
 */

import { Router } from 'express';
import { checkLogin } from '../middleware/check';
import { findById, findList } from '../service/ArticleService';
import { success } from '../util/responseTemplate';

const router = Router();

// GET /article/list 获得文章列表
// param keyword=xxx page
router.get('/list', async (req, res) => {
  const { keyword, page = 1, size = 10 } = req.query;
  const data = await findList({ keyword, page, size });
  res.json(success(data));
});

// GET /article/:articleId 获得单条文章信息
router.get('/:articleId', async (req, res) => {
  const { articleId } = req.params;
  const data = await findById(articleId);
  res.json(success(data));
});

export default router;
