const { Model, DataTypes } = require('sequelize');

class Recipe extends Model {}
Recipe.init({
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
        references: {
            model: categories,
            key: id
        }
    }
},
    
{
    sequelize,
    modelName: 'recipe'
})

module.exports = Recipe