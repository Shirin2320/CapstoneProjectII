const { models } = require('../database');

const restrictionsController = {
    updateDietaryRestrictions: async (userId, restrictions) => {
        try {
            // Get user 
            const user = await models.User.findByPk(userId)
            if (!user) {
                throw Error("User not found")
            }

            // Removed previous allergies & adds provided ones 
            if(restrictions != null){
                await user.setDietaryRestrictions(restrictions)
            } else {
                throw Error("Dietary Restrictions not provided.")
            }

            console.log(`Added allergies to ${user.username}: ${restrictions.name.join(", ")}`);
        }  catch (err) {
            console.log("Error adding dietary restrictions:", err.message)
            throw new Error("Error adding dietary restrictions:", err.message)
        }
    },

}

module.exports = restrictionsController