const axios = require('axios');
const qs = require('qs');

const data = qs.stringify({
  SpCode: '',
  LoginName: '',
  Password: '',
  MessageContent: '您的预约验证码：666666，请在10分钟内使用！',
  UserNumber: '',
  // templateId: '',
  SerialNumber: '',
});

const config = {
  method: 'post',
  url: '',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
  data,
};

axios(config)
  .then(response => {
    console.log(JSON.stringify(response.data));
  })
  .catch(error => {
    console.log(error);
  });
