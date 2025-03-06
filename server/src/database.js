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

DietaryRestrictions.belongsToMany(Categories, { through: 'DietaryRestrictionCategory' })
Categories.belongsToMany(DietaryRestrictions, { through: 'DietaryRestrictionCategories'})

Questionnaire.belongsToMany(Categories, { through: 'QuestionCategory' });
Categories.belongsToMany(Questionnaire, { through: 'QuestionCategory' });

Recipe.belongsToMany(Categories, { through: 'RecipeCategories' });
Categories.belongsToMany(Recipe, { through: 'RecipeCategories' });

Recipe.belongsToMany(Ingredient, { through: 'RecipeIngredients' });
Ingredient.belongsToMany(Recipe, { through: 'RecipeIngredients' });

User.belongsToMany(Recipe, { through: 'UserRecipes' });
Recipe.belongsToMany(User, { through: 'UserRecipes' });

User.belongsToMany(Allergy, { through: 'UserAllergies' });
Allergy.belongsToMany(User, { through: 'UserAllergies' });

User.belongsToMany(DietaryRestrictions, { through: 'UserDietaryRestrictions' });
DietaryRestrictions.belongsToMany(User, { through: 'UserDietaryRestrictions' });

User.hasMany(MealHistory);
MealHistory.belongsTo(User);

Recipe.hasMany(MealHistory);
MealHistory.belongsTo(Recipe);

sequelize.sync()
    .then(async () => { 
        console.log('All models were synchronized successfully.')
        await populateDatabase(sequelize.models)
        console.log("Database populated")
    })
    .catch(err => console.log(err));

module.exports = sequelize;