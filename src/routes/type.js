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
router.get('/get/:typeId', (req, res) => {
  const { typeId } = req.params;
  findById(typeId).then((data) => {
    res.json(success(data));
  }).catch(() => {
    res.json(failed('数据不存在'));
  });
});

router.post('/add', checkLogin, (req, res) => {
  const { name = '' } = req.body;
  if (!name || name.trim().length <= 0) {
    res.json(validateFaile('类型名称不能为空'));
  } else {
    findList({ keyword: name }).then((list) => {
      if (list && list.length) {
        res.json(failed('该类型已存在'));
      } else {
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
    }).catch(() => {
      res.json(failed('添加失败'));
    });
  }
});

router.post('/edit', checkLogin, (req, res) => {
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
