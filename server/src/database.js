const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://komedb:komepass7@localhost:5433/kome');

const models = [
    require('./model/user')
];

for (const model of models) {
    model(sequelize);
}

module.exports = sequelize;
