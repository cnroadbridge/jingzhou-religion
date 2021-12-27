const axios = require('axios');
const qs = require('qs');

exports.createInstance = (
  baseURL = '',
  timeout = 60000,
  withCredentials = true
) => {
  const instance = axios.create({
    baseURL,
    timeout,
    withCredentials,
    paramsSerializer(params) {
      return qs.stringify(params, {
        arrayFormat: 'repeat',
      });
    },
    validateStatus: () => true,
  });

  instance.interceptors.request.use(config => {
    // 防止中文乱码
    // eslint-disable-next-line no-param-reassign
    config.url = encodeURI(config.url);
    return config;
  });

  instance.interceptors.response.use(
    res => res,
    error => Promise.reject(error)
  );

  return instance;
};
