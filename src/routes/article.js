/**
 * Created by MingYin Lv on 2017/2/18 下午8:09.
 */

import { Router } from 'express';
import { checkLogin } from '../middleware/check';
import { findById, findList, addArticle, deleteById, updateArticleById } from '../service/ArticleService';
import { success, validateFaile, failed } from '../util/responseTemplate';

const router = Router();

// GET /article/list 获得文章列表
// param keyword=xxx page
router.get('/list', async(req, res) => {
  const { keyword, page = 1, size = 10 } = req.query;
  findList({ keyword, page, size }).then((data) => {
    res.json(success(data));
  });
});

// GET /article/:articleId 获得单条文章信息
router.get('/get/:articleId', (req, res) => {
  const { articleId } = req.params;
  findById(articleId).then((data) => {
    res.json(success(data));
  }).catch(() => {
    res.json(failed('数据不存在'));
  });
});

// POST /article/add 添加文章
router.post('/add', checkLogin, (req, res) => {
  const { title = '', content = '', tag = '', type_id = '' } = req.body;
  const { user } = req.session;
  if (!title.trim()) {
    res.json(validateFaile('标题不能为空'));
  } else if (!content.trim()) {
    res.json(validateFaile('内容不能为空'));
  } else if (!type_id.trim()) {
    res.json(validateFaile('文章分类错误'));
  } else {
    addArticle({
      title,
      content,
      author: user.username || '管理员',
      tag,
      type_id,
    }).then(({ result, line }) => {
      if (line > 0 && result) {
        res.json(success(result, '添加成功'));
      } else {
        res.json(failed('添加失败'));
      }
    }).catch(() => {
      res.json(failed('添加失败'));
    });
  }
});

// POST /article/delete 删除文章
router.post('/delete', checkLogin, (req, res) => {
  const { id } = req.body;
  deleteById(id)
    .then(() => {
      // if (result.n > 0) {
      res.json(success({}, '删除成功'));
      // } else {
      //   res.json(failed(('删除失败')));
      // }
    })
    .catch(() => {
      res.json(failed(('删除失败')));
    });
});

// POST /article/edit 修改
router.post('/edit', checkLogin, (req, res) => {
  const { id = '', title = '', content = '', tag = '', type_id = '' } = req.body;
  if (!id.trim()) {
    res.json(validateFaile('数据不存在，无法修改!'));
  } else if (!title.trim()) {
    res.json(validateFaile('标题不能为空'));
  } else if (!content.trim()) {
    res.json(validateFaile('内容不能为空'));
  } else if (!type_id.trim()) {
    res.json(validateFaile('文章分类错误'));
  } else {
    updateArticleById({
      _id: id,
      title,
      content,
      tag,
      type_id,
    }).then((result) => {
      if (result.n > 0) {
        res.json(success({}, '修改成功'));
      } else {
        res.json(failed('修改失败'));
      }
    }).catch(() => {
      res.json(failed('修改失败'));
    });
  }
});

export default router;