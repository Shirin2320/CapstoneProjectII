const { models } = require('../database');

const mlController = {
    getMealHistory: async (userId) => {
        try {
            // Find user & users meal history 
            const user = await models.User.findAll({ 
                where: { id: userId },
                include: { model: MealHistory }
            })

            // If no user or meal history 
            if(!user){
                return "User not found"
            } else if(!user.MealHistories){
                return "No meal history"
            }

            return user.MealHistories
        } catch (err) {
            console.log("Error getting meal history:", err.message)
            throw new Error("Error getting meal history:", err.message)
        }
    },
    addMealHistory: async (userId, recipe) => {
        try {
            const user = await models.User.findOne({ 
                where: { id: userId },
                include: { model: MealHistory }
            })

            if(!user){
                return "User not found"
            }

            await user.addMealHistory(recipe)
            console.log(`Added ${recipe.name}: ${user.username}'s meal history.`);
        } catch (err) {
            console.log("Error adding recipe to history:", err.message)
            throw new Error("Error adding recipe to history:", err.message)
        }
    },
    deleteMealHistory: async (userId, recipe) => {
        try {
            // find user 
            const user = await models.User.findByPk(userId)
            if(!user){
                return "User not found"
            }

            await models.MealHistory.destroy({
                where: {
                    User: user,
                    Recipe: recipe
                }
            })
            console.log(`Deleted ${recipe.name}: ${user.username}'s meal history.`);
        } catch (err) {
            console.log("Error deleting history:", err.message)
            throw new Error("Error deleting history:", err.message)
        }
    },
}

module.exports = mlController