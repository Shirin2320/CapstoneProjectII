const { Model, DataTypes } = require('sequelize');

class Dietary_Restrictions extends Model{}
Dietary_Restrictions.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    
{
    sequelize,
    modelName: 'dietary_restrictions'
})

module.exports = Dietary_Restrictions