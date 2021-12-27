'use strict';

const { Controller } = require('egg');

class RecordController extends Controller {
  async index() {
    const { ctx, service } = this;
    const { mobile, code, createTime } = ctx.request.query;
    const res = await service.sms.getByMobileCode(mobile, code);
    let data = [];
    if (res) {
      data = await service.record.getAllByMobile(mobile, createTime);
    }
    ctx.success(data);
  }

  async create() {
    const { ctx, service } = this;
    const {
      username,
      gender,
      mobile,
      idcard,
      orgin,
      province,
      city,
      place,
      religiousCountry,
      religiousType,
      matter,
      visiteDate,
      visiteTime,
      leaveTime,
    } = ctx.request.body;
    const data = await service.record.add(
      username,
      gender,
      mobile,
      idcard,
      orgin,
      province,
      city,
      place,
      religiousCountry,
      religiousType,
      matter,
      visiteDate,
      visiteTime,
      leaveTime
    );
    ctx.success(data);
  }

  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const {
      username,
      gender,
      mobile,
      idcard,
      orgin,
      province,
      city,
      place,
      religiousCountry,
      religiousType,
      matter,
      visiteDate,
      visiteTime,
      leaveTime,
    } = ctx.request.body;
    const data = await service.record.set(
      id,
      username,
      gender,
      mobile,
      idcard,
      orgin,
      province,
      city,
      place,
      religiousCountry,
      religiousType,
      matter,
      visiteDate,
      visiteTime,
      leaveTime
    );
    ctx.success(data);
  }

  async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const data = await service.record.get(id);
    ctx.success(data);
  }
}

module.exports = RecordController;
