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
    },
    createRecipe: async (user, name, description, instructions, ingredients) => { // Create Recipe 
        try {
            // no duplicate name 
            // API call to check the other db we're using? 
            const dupName = await models.Recipe.findOne({ where: { name: name }})
            if(name){
                throw Error("Name already in use")
            }

            // create link for recipe 
            
            // find ingredients
            // API call to check other db we're using?
            
            // Save to Recipe db 
            
            // Save connection to user 
            // Save connection to ingredients 

            // return new link 
        } catch (err) {
            console.log("Error creating recipe:", err.message)
            throw new Error("Error creating recipe:", err.message)
        }
    }
};

module.exports = recipeController;