import { UrlModel } from './urlSchema.js';
import { User } from './user.js';

User.hasMany(UrlModel, { foreignKey: {name:'userId'} })
UrlModel.belongsTo(User, { foreignKey: {name:'userId'} })

export { User, UrlModel };