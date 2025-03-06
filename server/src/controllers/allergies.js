const { models } = require('../database');

const allergiesController = {
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