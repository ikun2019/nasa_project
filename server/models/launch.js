'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Launch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Launch.hasMany(models.Planet);
    }
  }
  Launch.init({
    flightNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    launchDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    mission: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rocket: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    target: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customers: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    upcoming: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    success: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'Launch',
  });
  return Launch;
};