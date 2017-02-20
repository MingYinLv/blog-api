/**
 * Created by MingYin Lv on 2017/2/18 下午8:09.
 */

import { Router } from 'express';
import { checkLogin } from '../middleware/check';
import { findById, findList, addArticle, deleteById } from '../service/ArticleService';
import { success, validateFaile, failed } from '../util/responseTemplate';

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

// POST /article/add 添加文章
router.post('/add', checkLogin, async (req, res) => {
  const { title, content, author, tag, type } = req.body;

  if (!title.trim()) {
    res.json(validateFaile('标题不能为空'));
  } else if (!content.trim()) {
    res.json(validateFaile('内容不能为空'));
  } else if (!type.trim() || type.length < 32) {
    res.json(validateFaile('文章分类错误'));
  } else {
    addArticle({
      title,
      content,
      author,
      tag,
      type,
      publishDate: new Date(),
      updateDate: new Date(),
    }).then(({ result, line }) => {
      if (line > 0) {
        res.json(success(result, '添加成功'));
      } else {
        res.json(failed('添加失败'));
      }
    }).catch(() => {
      res.json(failed('添加失败'));
    });
  }
});

// POST /article/add 删除文章
router.post('/delete', checkLogin, (req, res) => {
  const { id } = req.body;
  deleteById(id)
    .then(() => {
      res.json(success({}, '删除成功'));
    })
    .catch(() => {
      res.json(failed(('删除失败')));
    });
});

export default router;
