'use strict';

const { Controller } = require('egg');

class SMSController extends Controller {
  async index() {
    const { ctx, service } = this;
    const { mobile, code } = ctx.request.query;
    const data = await service.sms.getByMobileCode(mobile, code);
    ctx.success(data);
  }

  async create() {
    const { ctx, service } = this;
    const {
      mobile,
      code,
      result,
      serialNumber,
      taskId,
      count,
      status,
      isExpire,
    } = ctx.request.body;
    const data = await service.sms.add(
      mobile,
      code,
      result,
      serialNumber,
      taskId,
      count,
      status,
      isExpire
    );
    ctx.success(data);
  }

  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const {
      mobile,
      code,
      result,
      serialNumber,
      taskId,
      count,
      status,
      isExpire,
    } = ctx.request.body;
    const data = await service.sms.set(
      id,
      mobile,
      code,
      result,
      serialNumber,
      taskId,
      count,
      status,
      isExpire
    );
    ctx.success(data);
  }

  async sendSMS() {
    const { ctx, service } = this;
    if (ctx.request.url === '/sms/send') {
      const { mobile } = ctx.request.body;
      const data = await service.sms.sendSMS(mobile);
      ctx.success(data);
    } else {
      ctx.success('卧槽，你不讲武德');
    }
  }
}

module.exports = SMSController;
