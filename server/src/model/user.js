const { DataTypes } = require('sequelize');
const Allergies = require('./allergies');
const Dietary_Restrictions = require('./dietary_restrictions');
const Meal_history = require('./meal_history');

module.exports = (sequelize) => {
    sequelize.define('User', {
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        full_name: DataTypes.STRING,
        password: DataTypes.STRING,
        weight: DataTypes.FLOAT,
        gender: DataTypes.STRING,
        goal: DataTypes.STRING,
        
        dietary_restrictions: { // References table holding the dietary restrictions to keep things clean
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            reference: {
                model: Dietary_Restrictions,
                key: 'id'
            }
        },

        allergies: { // References table holding the allergies to keep things clean
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            reference: {
                model: Allergies,
                key: 'id'
            }
        },
        
        meal_history: { // References table holding meal history
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Meal_history,
                key: 'id'
            }
        },
    });
};
