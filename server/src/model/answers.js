const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Answers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    answer: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})}