import sequelize from '../Config/db.js';
import { DataTypes } from 'sequelize';

export const User = sequelize.define('user' , {
  authId: DataTypes.STRING,
});