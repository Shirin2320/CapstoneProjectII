const { DataTypes } = require('sequelize');

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
                model: dietary_restrictions,
                key: id
            }
        },
        allergies: { // References table holding the allergies to keep things clean
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            reference: {
                model: allergies,
                key: id
            }
        }
    });
};
