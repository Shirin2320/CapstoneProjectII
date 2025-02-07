const { Model, DataTypes } = require('sequelize');

class Questionnaire extends Model{}
Questionnaire.init({
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
            model: answer,
            key: id
        }
    }
},
    
{
    sequelize,
    modelName: 'questionnaire'
})

module.exports = Questionnaire