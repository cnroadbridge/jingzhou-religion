const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/ShangHai');

exports.now = () => dayjs().unix();

exports.formatDate = function (
  template = 'YYYY-MM-DD HH:mm:ss',
  date = Date.now()
) {
  return dayjs(date).format(template);
};

exports.transformDate = function (date) {
  return dayjs(date).valueOf();
};
