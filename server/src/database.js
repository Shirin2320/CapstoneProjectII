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

Allergies.belongsToMany(Ingredient, { through: 'AllergyIngredients' });
Ingredient.belongsToMany(Allergies, { through: 'AllergyIngredients' });

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

User.belongsToMany(MealHistory, { through: 'UserMealHistory' });
MealHistory.belongsToMany(User, { through: 'UserMealHistory' });

MealHistory.belongsToMany(Recipe, { through: 'MealHistoryRecipe' });
Recipe.belongsToMany(MealHistory, { through: 'MealHistoryRecipe' });

sequelize.sync()
    .then(async () => { 
        console.log('All models were synchronized successfully.')
        await populateDatabase(sequelize.models)
        console.log("Database populated")
    })
    .catch(err => console.log(err));

module.exports = sequelize;