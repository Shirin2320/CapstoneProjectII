const { DataTypes } = require('sequelize');
const Recipe = require('./recipe');
const user = require('./user');

module.exports = (sequelize) => {
    sequelize.define('meal_history', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: 'id'
        }
    },

    recipe_ids: {
        type: DataTypes.ARRAY(DataTypes.NUMBER),
        allowNull: true,
        references: {
            model: Recipe, 
            key: 'id'
        }
    }
})}