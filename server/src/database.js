const { Sequelize } = require('sequelize');
const populateDatabase = require('./populate')
const sequelize = new Sequelize('postgres://komedb:komepass7@localhost:5433/kome');

const models = [
    require("./model/allergies"),
    require("./model/categories"),
    require("./model/dietary_restrictions"),
    require("./model/ingredient"),
    require("./model/meal_history"),
    require("./model/questionnaire"),
    require("./model/recipe"),
    require('./model/user'),
];

for (const model of models) {
    model(sequelize);
}

const { Allergies, Categories, DietaryRestrictions, Ingredient, MealHistory, Questionnaire, Recipe, User } = sequelize.models;

Allergies.hasMany(Ingredient);
Ingredient.belongsTo(Allergies);

Questionnaire.belongsToMany(Categories, { through: 'QuestionCategory' });
Categories.belongsToMany(Questionnaire, { through: 'QuestionCategory' });

Recipe.belongsTo(Categories);
Categories.hasMany(Recipe);

Recipe.hasMany(Ingredient);
Ingredient.belongsTo(Recipe);

User.belongsToMany(Recipe, { through: 'UserRecipes' });
Recipe.belongsToMany(User, { through: 'UserRecipes' });

User.hasMany(Allergies);
Allergies.belongsTo(User);

User.hasMany(DietaryRestrictions);
DietaryRestrictions.belongsTo(User);

User.hasOne(MealHistory);
MealHistory.belongsTo(User);


sequelize.sync()
    .then(async () => { 
        console.log('All models were synchronized successfully.')
        await populateDatabase(sequelize.models)
        console.log("Database populated")
    })
    .catch(err => console.log(err));

module.exports = sequelize;