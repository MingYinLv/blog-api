/**
 * Created by MingYin Lv on 2017/2/18 下午7:01.
 */

import mongoose from 'mongoose';
import Promise from 'bluebird';
import ArticleSchema from './Schema/ArticleSchema';
import PersonSchema from './Schema/PersonSchema';

mongoose.Promise = Promise;
const db = mongoose.createConnection('localhost', 'blog');


export const ArticleModel = db.model('article', ArticleSchema, 'articles');
export const PersonModel = db.model('person', PersonSchema, 'person');

