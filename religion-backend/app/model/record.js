'use strict';

module.exports = app => {
  const { logger, Sequelize, utils } = app;
  const { DataTypes, Model, Op } = Sequelize;

  class RecordModel extends Model {
    static async getAllByMobile(mobile, createTime) {
      const where = {
        mobile,
        createTime: { [Op.gte]: createTime },
      };
      try {
        const ret = await this.findAll({
          raw: true,
          where,
          order: [['createTime', 'DESC']],
        });
        logger.info(this.getAllByMobile, where, ret);
        return ret;
      } catch (e) {
        logger.error(e);
        return [];
      }
    }

    static async get(id) {
      const where = { id };
      try {
        const ret = await this.findOne({
          raw: true,
          where,
        });
        logger.info(this.get, where, ret);
        return ret;
      } catch (e) {
        logger.error(e);
        return {};
      }
    }

    static async add(
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
      const field = {
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
      const field = {
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

  RecordModel.init(
    {
      id: {
        type: DataTypes.STRING(255),
        defaultValue() {
          return utils.generator.generateUUID();
        },
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING(2),
        allowNull: true,
      },
      mobile: {
        type: DataTypes.STRING(11),
        allowNull: true,
      },
      idcard: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      orgin: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      province: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      place: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      religiousCountry: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      religiousType: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      matter: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      visiteDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      visiteTime: {
        type: DataTypes.STRING(12),
        allowNull: true,
      },
      leaveTime: {
        type: DataTypes.STRING(12),
        allowNull: true,
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
      tableName: 't_record',
    }
  );

  return RecordModel;
};
