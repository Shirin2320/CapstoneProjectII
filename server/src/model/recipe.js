const { DataTypes } = require('sequelize');
const Categories = require('./categories');

module.exports = (sequelize) => {
    sequelize.define('recipes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    author: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    link: {
        type: DataTypes.STRING,
        allowNull: true
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

    instructions: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    categories: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        references: "categories",
        referencesKey: 'id'
    }
})}