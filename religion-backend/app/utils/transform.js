const qs = require('qs');

exports.str2Obj = function (str) {
  const res = {};
  const arr = str.split('&');
  for (const item of arr) {
    const [key, value] = item.split('=');
    res[key] = value;
  }
  return res;
};

exports.obj2str = function (obj) {
  return qs.stringify(obj);
};
