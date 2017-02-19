/**
 * Created by MingYin Lv on 2017/2/18 下午8:08.
 */

import article from './article';
import type from './type';
import person from './person';

export default (app) => {
  app.use('/article', article);
  app.use('/type', type);
  app.use('/person', person);
  app.use('*', (req, res) => {
    res.status(404).send('404 Request');
  });
};
