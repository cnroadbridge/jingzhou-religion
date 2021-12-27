/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   * */
  const config = (exports = {
    SMS_SEND_UTF8_URL: '',
    SP_CODE: '',
    LOGIN_NAME: '',
    PASSWORD: '',
  });

  // use for cookie sign key, should change to your own and keep security
  config.keys = `${appInfo.name}_ataola`;

  // add your middleware config here
  config.middleware = ['cost', 'errorHandler'];

  // add your user config here
  const userConfig = {
    myAppName: 'egg',
  };

  config.security = {
    xframe: {
      enable: true,
      value: 'SAMEORIGIN',
    },
    csrf: {
      enable: true,
      ignoreJSON: false,
      useSession: true,
      cookieName: 'csrfToken',
      sessionName: 'csrfToken',
    },
    domainWhiteList: ['*'],
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // https://github.com/eggjs/egg-sequelize
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'religion',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'ataola',
    // delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
    // baseDir: 'my_model', // load all files in `app/${baseDir}` as models, default to `model`
    // exclude: 'index.js', // ignore `app/${baseDir}/index.js` when load models, support glob and array
    // more sequelize options
    timezone: '+08:00',
    define: {
      timestamps: false,
      underscored: false,
    },
  };

  config.session = {
    key: 'SESSION_ID', // 设置session key,cookie里面的key
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true, // 是否允许js访问session,默认为true,表示不允许js访问
    encrypt: true, // 是否加密
    renew: true, // 重置session的过期时间，延长session过期时间
  };

  config.logger = {
    level: 'NONE',
    consoleLevel: 'DEBUG',
    disableConsoleAfterReady: false,
  };

  config.errorHandler = {
    match: '/',
  };

  config.customLoader = {
    enum: {
      directory: 'app/enum',
      inject: 'app',
      loadunit: true,
    },
    utils: {
      directory: 'app/utils',
      inject: 'app',
      loadunit: true,
    },
  };

  config.cluster = {
    listen: {
      path: '',
      port: 9000,
      hostname: '0.0.0.0',
    },
  };

  config.assets = {
    publicPath: '/public/',
  };

  config.view = {
    defaultExtension: '.html',
    root: [path.join(appInfo.baseDir, 'app/view')].join(','),
    mapping: {
      '.html': 'nunjucks',
    },
  };

  config.ratelimiter = {
    // db: {},
    router: [
      {
        path: '/sms/send',
        max: 5,
        time: '60s',
        message: '卧槽，你不讲武德，老是请求干嘛干嘛干嘛！',
      },
    ],
  };

  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: null,
      db: 0,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
