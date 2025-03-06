const { models } = require('../database');

const restrictionsController = {
    getRestrictions: async () => {
        try {
            return await models.DietaryRestrictions.findAll()
        } catch (err) {
            console.log("Error getting dietary restrictions:", err.message)
            throw new Error("Error getting dietary restrictions:", err.message)
        }
    },
    getRestriction: async (id) => {
        try {        
            return await models.DietaryRestrictions.findByPk(id)
        } catch (err) {
            console.log("Error getting dietary restriction:", err.message)
            throw new Error("Error getting dietary restriction:", err.message)
        }
    },
    addRestriction: async (name) => {
        try {
            // get all restrictions 
            const restrictions = models.DietaryRestrictions.findAll()
        
            // verify allergy doesn't already exist 
            if((await restrictions).includes(name)){
                throw Error("Dietary restriction already exists")
            }

            // save allergy 
            await models.DietaryRestrictions.create({ name: name })
        } catch (err) {
            console.log("Error adding dietary restrictions:", err.message)
            throw new Error("Error adding dietary restrictions:", err.message)
        }
    },
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

            console.log(`Added dietary restrictions to ${user.username}: ${restrictions.name.join(", ")}`);
        }  catch (err) {
            console.log("Error updating dietary restrictions:", err.message)
            throw new Error("Error updating dietary restrictions:", err.message)
        }
    },

}

module.exports = restrictionsController