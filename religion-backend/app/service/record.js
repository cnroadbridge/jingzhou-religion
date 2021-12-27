'use strict';

const { Service } = require('egg');

class RecordService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Record = this.ctx.model.Record;
  }

  async getAllByMobile(mobile, createTime) {
    const { Record } = this;
    const result = await Record.getAllByMobile(mobile, createTime);
    return result;
  }

  async get(id) {
    const { Record } = this;
    const result = await Record.get(id);
    return result;
  }

  async add(
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
  ) {
    const { ctx, Record } = this;
    const result = await Record.add(
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
    if (!result) {
      ctx.fail(result);
    }
    return result;
  }

  async set(
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
  ) {
    const { ctx, Record } = this;
    const result = await Record.set(
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
    if (!result) {
      ctx.fail(result);
    }
    return result;
  }
}

module.exports = RecordService;
