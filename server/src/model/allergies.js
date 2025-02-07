const { Model, DataTypes } = require('sequelize');

class Allergies extends Model {}
Allergies.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    ingredient_ids: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        references: {
            model: ingredient,
            key: id
        }
    }    
},
    
{
    sequelize,
    modelName: 'allergies'
})

module.exports = Allergies