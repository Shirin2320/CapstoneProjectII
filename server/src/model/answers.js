const { Model, DataTypes } = require('sequelize');

class Answer extends Model{}
Answer.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    answer: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
    
{
    sequelize,
    modelName: 'answer'
})

module.exports = Answer