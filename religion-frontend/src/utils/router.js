import Taro from '@tarojs/taro';

// https://taro-docs.jd.com/taro/docs/apis/route/navigateTo
export const goToPage = (page, params = {}, success, events) => {
  let url = `/pages/${page}/index`;
  if (Object.keys(params).length > 0) {
    let paramsStr = '';
    for (const key in params) {
      const tmpStr = `${key}=${params[key]}`;
      paramsStr = tmpStr + '&';
    }
    if (paramsStr.endsWith('&')) {
      paramsStr = paramsStr.substr(0, paramsStr.length - 1);
    }
    if (paramsStr) {
      url = `${url}?${paramsStr}`;
    }
  }
  Taro.navigateTo({
    url,
    success,
    events
  });
};
