const { DataTypes } = require('sequelize');
const Ingredient = require('./ingredient');

module.exports = (sequelize) => {
    sequelize.define('allergies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    ingredient_ids: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        references: {
            model: Ingredient,
            key: 'id'
        }
    }    
})}