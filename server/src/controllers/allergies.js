const { models } = require('../database');

const allergiesController = {
    getAllergies: async () => {
        return await models.Allergies.findAll()
    },
    getAllergy: async (id) => {        
        return await models.Allergies.findByPk(id)
    },
    addAllergy: async (name) => {
        // get all allergies 
        const allergies = models.Allergies.findAll()
    
        // verify allergy doesn't already exist 
        if((await allergies).includes(name)){
            throw Error("Allergy already exists")
        }

        // save allergy 
        await models.Allergies.create({ name: name })
    },
    updateAllergies: async (userId, allergies) => {
        try {
            // Get user 
            const user = await models.User.findByPk(userId)
            if (!user) {
                throw Error("User not found")
            }

            // Removed previous allergies & adds provided ones 
            await user.setAllergies(allergies)

            console.log(`Added allergies to ${user.username}: ${allergies.name.join(", ")}`);
        } catch (err) {
            console.log("Error adding allergies:", err.message)
            throw new Error("Error adding allergies:", err.message)
        }
    },
}

module.exports = allergiesController