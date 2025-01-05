const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
});
//Category.hasMany(Product, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
module.exports = Category;
