const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://komedb:komepass7@localhost:5433/kome');

const models = [
    require("./model/categories"),
    require("./model/dietary_restrictions"),
    require("./model/ingredient"),
    require("./model/recipe"),
    require("./model/allergies"),
    require("./model/answers"),
    require("./model/meal_history"),
    require("./model/questionnaire"),
    require('./model/user'),
];

for (const model of models) {
    model(sequelize);
}

sequelize.sync()
    .then(() => console.log('All models were synchronized successfully.'))
    .catch(err => console.log(err));

module.exports = sequelize;