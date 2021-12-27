'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/public/index', controller.home.index);
  router.get('/public/temple-select', controller.home.index);
  router.get('/public/visitor-registration', controller.home.index);
  router.get('/public/record-query', controller.home.index);
  router.get('/public/result-query', controller.home.index);
  router.post('/sms/send', controller.sms.sendSMS);

  function resource(path) {
    const pathArr = path.split('/');

    // 删掉第一个空白的
    pathArr.shift();

    let controllers = controller;
    for (const val of pathArr) {
      controllers = controllers[val];
    }

    router.resources(path, path, controllers);
  }

  resource('/record');
  resource('/sms');
};
