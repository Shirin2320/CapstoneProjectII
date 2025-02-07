const { DataTypes } = require('sequelize');
const Categories = require('./categories');

module.exports = (sequelize) => {
    sequelize.define('answers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    answer: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categories,
            key: 'id'
        }
    }
})}