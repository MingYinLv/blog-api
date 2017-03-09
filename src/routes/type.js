/**
 * Created by MingYin Lv on 2017/2/19 下午6:48.
 */

import { Router } from 'express';
import { checkLogin } from '../middleware/check';
import { findById, findList, addType, updateTypeById, deleteById } from '../service/TypeService';
import { success, failed, validateFaile } from '../util/responseTemplate';

const router = Router();

// GET /type/list 获得类型列表
// param keyword=xxx page
router.get('/list', async (req, res) => {
  const { keyword, page = 1, size = 10 } = req.query;
  const data = await findList({ keyword, page, size });
  res.json(success(data));
});

// GET /type/:typeId 获得单条类型信息
router.get('/:typeId', async (req, res) => {
  const { typeId } = req.params;
  const data = await findById(typeId);
  res.json(success(data));
});

router.post('/add', checkLogin, async (req, res) => {
  const { name = '' } = req.body;
  if (!name || name.trim().length <= 0) {
    res.json(validateFaile('类型名称不能为空'));
  } else {
    const list = await findList({ keyword: name });
    if (list && list.length) {
      res.json(failed('该类型已存在'));
      return 0;
    }
    addType({
      name,
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

router.post('/update', checkLogin, async (req, res) => {
  const { id, name } = req.body;
  if (!name || name.trim().length <= 0) {
    res.json(validateFaile('类型名称不能为空'));
  } else {
    updateTypeById({
      _id: id,
      name,
    }).then((result) => {
      if (result.n >= 1) {
        res.json(success({}, '修改成功'));
      } else {
        res.json(failed('修改失败'));
      }
    });
  }
});

router.post('/delete', checkLogin, async (req, res) => {
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
