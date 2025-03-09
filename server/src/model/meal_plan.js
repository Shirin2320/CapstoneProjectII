const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('MealPlan', {
        weekday: DataTypes.INTEGER,
    });
};