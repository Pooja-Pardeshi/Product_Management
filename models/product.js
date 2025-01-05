const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Category = require('./category');

const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    category_id: { 
        type: DataTypes.INTEGER,
        references: { model: Category, key: 'id' },
    },
});

Product.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Product;
