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
    updatePassword: async (id, password) => {
        const user = await models.User.findByPk(id);

        if (!user) {
            throw Error("User not found.");
        }

        user.password = bcrypt.hashSync(password, 10);
        await user.save();

        return user;
    },
    updateUser: async (id, username, email, full_name, weight, gender, goal) => {
        const user = await models.User.findByPk(id);

        if (!user) {
            throw Error("User not found.");
        }

        if (username) {
            const existingUser = await models.User.findOne({ where: { username } });
            if (!existingUser) {
                user.username = username;
            } else {
                throw Error("Username alread taken.")
            }
        }

        if (email) {
            user.email = email;
        }
        if (full_name) {
            user.full_name = full_name;
        }
        if (weight) {
            user.weight = weight;
        }
        if (gender) {
            user.gender = gender;
        }
        if (goal) {
            user.goal = goal;
        }

        await user.save();

        return user;
    },
    updateWeight: async (userId, weight) => {
        try {
            // Should be some frontend code that ensures valid weight
            const user = await models.User.findByPk(userId)

            if (!user) {
                throw Error("User not found.")
            }

            user.weight = weight
            await user.save()
            
        } catch (err) {
            console.log(err.message)
            return err.message
        }
    },
    updateGoal: async (userId, goal) => {
        try {
            // Find User
            const user = await models.User.findByPk(userId)

            if (!user) {
                throw Error("User not found.")
            }

            user.goal = goal
            await user.save()
            
        } catch (err) {
            console.log(err.message)
            return err.message
        }
    }
};

module.exports = userController;