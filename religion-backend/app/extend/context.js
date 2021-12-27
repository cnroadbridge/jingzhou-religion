'use strict';

module.exports = {
  success(data, code = 0, message = 'success') {
    const res = {
      status: 200,
      code,
      message,
      data,
    };

    this.app.logger.info(JSON.stringify(res));

    this.body = res;
  },
  fail(data, code = 500, message = 'fail') {
    const res = {
      status: 200,
      code,
      message,
      data,
    };

    this.app.logger.info(JSON.stringify(res));

    this.body = res;
  },
};
