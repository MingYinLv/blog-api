/**
 * Created by MingYin Lv on 2017/2/18 下午7:01.
 */

import { Schema } from 'mongoose';

export default new Schema({
  title: String, // 文章标题
  content: String, // 文章内容
  publishDate: Date, // 发布时间
  updateDate: Date, // 最后更新时间
  author: String, // 作者
  tag: String,  // 文章标签
  type: Schema.Types.ObjectId, // 文章分类Id
  accessTotal: Number, // 访问统计
});

