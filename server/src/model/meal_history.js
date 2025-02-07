const { Model, DataTypes } = require('sequelize');

class Meal_History extends Model {}
Meal_History.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: id
        }
    },

    recipe_ids: {
        type: DataTypes.ARRAY(DataTypes.NUMBER),
        allowNull: true,
        references: {
            model: recipe, 
            key: id
        }
    }
},
    
{
    sequelize,
    modelName: 'meal_history'
})

module.exports = Meal_History