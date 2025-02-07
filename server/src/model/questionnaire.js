const { DataTypes } = require('sequelize');
const Answer = require('./answers');

module.exports = (sequelize) => {
    sequelize.define('questionnaire', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    question: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    answer_ids: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        references: {
            model: Answer,
            key: 'id'
        }
    }
})}