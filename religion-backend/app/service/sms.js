'use strict';

const { Service } = require('egg');

class SMSService extends Service {
  constructor(ctx) {
    super(ctx);
    this.SMS = this.ctx.model.Sms;
  }

  async sendSMS(mobile) {
    const { ctx } = this;
    const {
      app: {
        config: { SMS_SEND_UTF8_URL, SP_CODE, LOGIN_NAME, PASSWORD },
        utils: { date, generator, request, transform },
      },
      logger,
    } = ctx;
    const serialNumber = `${date.transformDate()}${generator.getRandomNumber(
      7
    )}`;
    const code = generator.getRandomNumber(6);
    const messageContent = `您的预约验证码：${code}，请在10分钟内使用！`;
    const params = transform.obj2str({
      SpCode: SP_CODE,
      LoginName: LOGIN_NAME,
      Password: PASSWORD,
      MessageContent: messageContent,
      UserNumber: mobile,
      SerialNumber: serialNumber,
    });
    let ret = {};
    try {
      const { data } = await request.post(SMS_SEND_UTF8_URL, params, {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      });
      const { result, description, taskid: taskId } = transform.str2Obj(data);
      const status = result === '0' ? 0 : 1;
      await this.add(
        mobile,
        code,
        result,
        description,
        serialNumber,
        taskId,
        status
      );
      ret = {
        description,
        result,
      };
    } catch (e) {
      logger.error(e);
    }
    return ret;
  }

  async getAll() {
    const { SMS } = this;
    const result = await SMS.getAll();
    return result;
  }

  async getByMobileCode(mobile, code) {
    const { SMS } = this;
    const result = await SMS.getByMobileCode(mobile, code);
    return result;
  }

  async add(mobile, code, result, description, serialNumber, taskId) {
    const { ctx, SMS } = this;
    const res = await SMS.add(
      mobile,
      code,
      result,
      description,
      serialNumber,
      taskId
    );
    if (!res) {
      ctx.fail(res);
    }
    return res;
  }

  async set(
    id,
    mobile,
    code,
    result,
    description,
    serialNumber,
    taskId,
    count,
    status,
    isExpire
  ) {
    const { ctx, SMS } = this;
    const res = await SMS.set(
      id,
      mobile,
      code,
      result,
      description,
      serialNumber,
      taskId,
      count,
      status,
      isExpire
    );
    if (!res) {
      ctx.fail(res);
    }
    return res;
  }
}

module.exports = SMSService;
