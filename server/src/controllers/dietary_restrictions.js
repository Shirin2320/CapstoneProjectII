const { models } = require('../database');

const restrictionsController = {
    getRestrictions: async () => {
        return await models.DietaryRestrictions.findAll()
    },
    getRestriction: async (id) => {        
        return await models.DietaryRestrictions.findByPk(id)
    },
    addRestriction: async (name) => {
        // get all restrictions 
        const restrictions = models.DietaryRestrictions.findAll()
    
        // verify allergy doesn't already exist 
        if((await restrictions).includes(name)){
            throw Error("Dietary restriction already exists")
        }

        // save allergy 
        await models.DietaryRestrictions.create({ name: name })
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

            console.log(`Added allergies to ${user.username}: ${restrictions.name.join(", ")}`);
        }  catch (err) {
            console.log("Error adding dietary restrictions:", err.message)
            throw new Error("Error adding dietary restrictions:", err.message)
        }
    },

}

module.exports = restrictionsController