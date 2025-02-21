const { models } = require('../database');

const recipeController = {
    getRecipes: async () => {
        return await models.Recipe.findAll();
    },
    getRecipe: async (id) => {
        return await models.Recipe.findOne({id});
    },
    getUserRecipes: async (userId) => {
        const user = await models.User.findOne({userId}, {include: models.Recipe});
        return user;
    },
    addRecipeToUser: async (userId, recipeId) => {
        const user = await models.User.findOne({userId});
        const recipe = await models.Recipe.findOne({recipeId});
        return await user.addRecipe(recipe);
    }
};

module.exports = recipeController;