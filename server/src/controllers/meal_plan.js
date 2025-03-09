const { models } = require('../database');

const mealPlanController = {
    getAllPlans: async () => {
        try {
            return await models.MealPlan.findAll()
        } catch (err) {
            console.log("Error getting meal plans: ", err.message)
            throw new Error("Error getting meal plans: ", err.message)
        }
    },
    getDailyPlan: async (id) => {        
        try {
            return await models.MealPlan.findByPk(id)
        } catch (err) {
            console.log("Error getting meal plan: ", err.message)
            throw new Error("Error getting meal plan: ", err.message)
        }
    },
    generateMealPlan: async (userId) => {
        try {
            // get all allergies 
            const user = models.User.findByPk(userId);

            if (!user) {
                throw Error("Requires a valid user");
            }

            console.log(user);

            const validRecipes = models.Recipe.findAll({
                where: {
                    [models.Sequelize.Op.not]: user.Allergies
                }
            });
            console.log(validRecipes);
        
            // verify allergy doesn't already exist 
            if(validRecipes.length < 1){
                throw Error("Could not find suitable recipes")
            }

            const mealPlan = models.MealPlan.create({ userId: userId });

            console.log(mealPlan);

            mealPlan.breakfast = recipe[0];
            mealPlan.lunch = recipe[0];
            mealPlan.dinner = recipe[0];

            console.log(mealPlan);

            // save meal plan
            await mealPlan.save();
        } catch (err) {
            console.log("Error while generating meal plan: ", err.message)
            throw new Error("Error while generating meal plan: ", err.message)
        }
    },
}

module.exports = mealPlanController