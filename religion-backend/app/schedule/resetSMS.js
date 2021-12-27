const { Subscription } = require('egg');

class ResetSMS extends Subscription {
  static get schedule() {
    return {
      cron: '0 0 1 * * *',
      type: 'worker',
    };
  }

  async subscribe() {
    try {
      const refreshData = await this.service.sms.getAll();
      for (const data of refreshData) {
        const {
          id,
          mobile,
          code,
          result,
          description,
          serialNumber,
          taskId,
          count,
          status,
        } = data;
        this.service.sms.set(
          id,
          mobile,
          code,
          result,
          description,
          serialNumber,
          taskId,
          count,
          status,
          1 // isExpire
        );
      }
    } catch (e) {
      this.ctx.app.logger.error(e);
    }
  }
}

module.exports = ResetSMS;
