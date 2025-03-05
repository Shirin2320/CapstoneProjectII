const { models } = require('../database');
const bcrypt = require('bcrypt');

function comparePassword(user, password) {
    return bcrypt.compareSync(password, user.password);
}

const userController = {
    createUser: async (username, email, password) => {
        const existingUser = await models.User.findOne({ where: { username } });

        if (existingUser) {
            return res.status(409).json({ message: "Username or email already exists." });
        }

		const hash = bcrypt.hashSync(password, 10);
        return await models.User.create({ username, email, password: hash });
    },
    loginUser: async (username, password) => {
		if (!username || !password) {
			throw Error("Username and password are required.");
		}

        const user = await models.User.findOne({ where: { username } });

        if (!user) {
            throw Error("User not found.");
        }

        const valid = comparePassword(user, password);

        if (!valid) {
            throw Error("Invalid username or password.");
        }

        return user;
    },
    getUser: async (id) => {
        const user = await models.User.findByPk(id);

        if (!user) {
            throw Error("User not found.");
        }

        return user;
    },
    updateUser: async (id, username, email, password) => {
        const user = await models.User.findByPk(id);

        if (!user) {
            throw Error("User not found.");
        }

        if (username) {
            const existingUser = await models.User.findOne({ where: { username } });
            if(!existingUser){
                user.username = username;
            } else {
                throw Error("Username alread taken.")
            }
        }

        if (email) {
            user.email = email;
        }

        if (password) {
            user.password = bcrypt.hashSync(password, 10);
        }

        await user.save();

        return user;
    },
    updateAllergies: async (userId, allergies) => {
        try {
            // Check existing allergies 
            const currentAllergies = await models.UserAllergies.findAll({ where: { UserId: userId }})

            // if no allergies 
            if(!currentAllergies || currentAllergies.length == 0){
                await allergies.forEach(async (allergy) => {
                    await models.UserAllergies.create({ UserId: userId, AllergyId: allergy.id })
                    console.log("Allergy added")
                });
                return "Allergies updated"
            }

            // for ease, allergies & currentAllergies becomes just ids 
            const allergyIds = allergies.map(allergy => allergy.AllergyId)
            const currentAllergyIds = currentAllergies.map(allergy => allergy.AllergyId);

            // find where there are new ids in allergies 
            const newAllergies = allergyIds.filter(id => !currentAllergyIds.includes(id));
            
            // find ids that exist in currentAllergies but not allergies
            const oldAllergies = currentAllergyIds.filter(id => !allergyIds.includes(id));
            
            // Add new allergies
            if (newAllergies.length > 0){
                await Promise.all(newAllergies.map( async (id) => {
                    await models.UserAllergies.create({ UserId: userId, AllergyId: id })
                    console.log("Restriction added")
                }))
            }

            // Delete old allergies 
            if (oldAllergies.length > 0) {
                await models.UserAllergies.destroy({
                    where: { UserId: userId, AllergyId: oldAllergies }
                });
            }

            console.log("Allergies Updated")
            return "Allergies updated"

        } catch (err) {
            console.log(err.message)
            return err.message
        }
    },
    updateDietaryRestrictions: async (userId, restrictions) => {
        try {
            // Check existing restrictions
            const currentRestrictions = await models.UserDietaryRestrictions.findAll({ where: { id: userId }})

            // if none
            if(!currentRestrictions || currentRestrictions.length == 0){
                await restrictions.forEach( async (restrictions) => {
                    await models.UserDietaryRestrictions.create({ UserId: userId, DietaryRestrictionsId: restrictions.id })
                    console.log("Added restriction")
                })
            }

            // for ease, restrictions & currentRestrictions becomes just ids
            const restrictionIds = restrictions.map(restriction => restriction.DietaryRestrictionsId)
            const currentRestrictionsId = currentRestrictions.map(restriction => restriction.DietaryRestrictionsId)
            
            // get new restriction ids 
            const newRestrictions = restrictionId.filter(id => !currentRestrictionsId.includes(id))
            
            // get restriction ids that no longer exist 
            const oldRestrictions = currentRestrictionsId.filter(id => !restrictions.includes(id))

            // Add new Restrictions
            if (newRestrictions.length > 0) {
                await Promise.all(newRestrictions.map(async (id) => {
                    await models.UserDietaryRestrictions.create({ UserId: userId, DietaryRestrictionsId: id})
                    console.log("Restriction added")
                }))
            }

            // Delete old Restrictions
            if (oldRestrictions.length > 0) {
                await models.UserDietaryRestrictions.destroy({
                    where: { UserId: userId, DietaryRestrictionsId: oldRestrictions }
                })
            }

            console.log("Restrictions updated")
            return "Dietary Restrictions updated"
            
        } catch (err) {
            console.log(err.message)
            return err.message
        }
    },
};

module.exports = userController;