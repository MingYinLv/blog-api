/**
 * Created by MingYin Lv on 2017/2/18 下午7:17.
 */

import { Schema } from 'mongoose';

export default new Schema({
  name: String,
  sex: String,
  age: Number,
  photo: String,
  username: String,
  password: String,
});
