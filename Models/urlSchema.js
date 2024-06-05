import sequelize from '../Config/db.js';
import { DataTypes } from 'sequelize';

export const UrlModel = sequelize.define('link' , {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  shortId: DataTypes.STRING,
  originalUrl: DataTypes.STRING,
  shortenUrl: DataTypes.STRING,
  clicks: DataTypes.INTEGER
});