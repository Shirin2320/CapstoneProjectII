const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('User', {
        username: DataTypes.STRING,
        full_name: DataTypes.STRING,
        password: DataTypes.STRING,
        weight: DataTypes.FLOAT,
        password: DataTypes.FLOAT,
        gender: DataTypes.STRING,
        goal: DataTypes.STRING,
    });
};
