const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Questionnaire', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    question: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})}