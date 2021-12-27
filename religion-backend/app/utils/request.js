const { createInstance } = require('./instance');

const request = createInstance();
module.exports = {
  get(url, param = {}, header = {}) {
    const params = {
      url,
      method: 'get',
      header,
    };
    if (param) {
      Object.assign(params, param);
    }
    return this.fetch(params);
  },
  post(url, data = {}, headers = {}) {
    const params = {
      url,
      method: 'post',
      data,
      headers,
    };
    return this.fetch(params);
  },
  put(url, data = {}, headers = {}) {
    const params = {
      url,
      method: 'put',
      data,
      headers,
    };
    return this.fetch(params);
  },
  delete(url, param = {}) {
    const params = {
      url,
      method: 'delete',
    };
    if (Object.keys(param).length > 0) {
      Object.assign(params, param);
    }
    return this.fetch(params);
  },
  fetch(params) {
    return new Promise((resolve, reject) =>
      request
        .request(params)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        })
    );
  },
};
