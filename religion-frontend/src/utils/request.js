import Taro from '@tarojs/taro';
const baseUrl = 'http://127.0.0.1:9000'; // 请求的地址

export function request(options, isLoading = true) {
  const { url, data, method, header } = options;
  isLoading &&
    Taro.showLoading({
      title: '加载中'
    });
  return new Promise((resolve, reject) => {
    Taro.request({
      url: baseUrl + url,
      data: data || {},
      method: method || 'GET',
      header: header || {},
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      },
      complete: () => {
        isLoading && Taro.hideLoading();
      }
    });
  });
}
