'use strict';

module.exports = app => {
  const { logger, Sequelize, utils } = app;
  const { DataTypes, Model, Op } = Sequelize;

  class SMSModel extends Model {
    static async getByMobileCode(mobile, code) {
      const where = { mobile, code, status: 0, isExpire: 0 };
      try {
        const ret = await this.findOne({
          raw: true,
          where,
          order: [['createTime', 'DESC']],
        });
        logger.info(this.get, where, ret);
        return ret;
      } catch (e) {
        logger.error(e);
        return false;
      }
    }

    static async getAll() {
      try {
        const ret = await this.findAll({
          raw: true,
          order: [['createTime', 'DESC']],
        });
        logger.info(this.get, ret);
        return ret;
      } catch (e) {
        logger.error(e);
        return [];
      }
    }

    static async add(
      mobile,
      code,
      result,
      description,
      serialNumber,
      taskId,
      status
    ) {
      const field = {
        mobile,
        code,
        result,
        description,
        serialNumber,
        taskId,
        status,
        createTime: utils.date.formatDate(),
        updateTime: utils.date.formatDate(),
      };
      try {
        let ret = await this.create(field, { raw: true });
        ret = ret.toJSON();
        logger.info(this.add, field, ret);
        return ret;
      } catch (e) {
        logger.error(e);
        return false;
      }
    }

    static async set(
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
      const field = {
        mobile,
        code,
        result,
        description,
        serialNumber,
        taskId,
        count,
        status,
        isExpire,
        updateTime: utils.date.formatDate(),
      };
      const where = { id };
      try {
        const ret = await this.update(field, { where });
        logger.info(this.set, field, where, ret);
        return ret[0];
      } catch (e) {
        logger.error(e);
        return false;
      }
    }
  }

  SMSModel.init(
    {
      id: {
        type: DataTypes.STRING(255),
        defaultValue() {
          return utils.generator.generateUUID();
        },
        allowNull: false,
        primaryKey: true,
      },
      mobile: {
        type: DataTypes.STRING(11),
        allowNull: true,
      },
      code: {
        type: DataTypes.STRING(6),
        allowNull: true,
      },
      result: {
        type: DataTypes.STRING(6),
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      serialNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      taskId: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      isExpire: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      createTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updateTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize: app.model,
      tableName: 't_sms',
    }
  );

  return SMSModel;
};
