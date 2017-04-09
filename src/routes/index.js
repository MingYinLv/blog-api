/**
 * Created by MingYin Lv on 2017/2/18 下午8:08.
 */

import article from './article';
import type from './type';
import person from './person';
import upload from './upload';
import { failed } from '../util/responseTemplate';

export default (app) => {
  app.use('/article', article);
  app.use('/type', type);
  app.use('/person', person);
  app.use('/upload', upload);
  app.use('*', (req, res) => {
    res.status(404).send('404 Request');
  });
  app.use((err, req, res, next) => {
    res.json(failed());
  });
};
