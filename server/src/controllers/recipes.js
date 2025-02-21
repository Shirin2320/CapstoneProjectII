const { get } = require('../app');
const { models } = require('../database');
const { getUser } = require('./users');

const recipeController = {
    getRecipes: async () => {
        return await models.Recipe.findAll();
    },
    getRecipe: async (id) => {
        return await models.Recipe.findOne({id});
    },
    getUserRecipes: async (userId) => {
        const user = await models.User.findOne({userId});
        return await user.getRecipes();
    },
    addRecipeToUser: async (userId, recipeId) => {
        const user = await models.User.findOne({userId});
        const recipe = await models.Recipe.findOne({recipeId});
        return await user.addRecipe(recipe);
    }
};

module.exports = recipeController;