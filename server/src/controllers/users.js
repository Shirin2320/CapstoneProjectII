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

        return comparePassword(user, password);
    },
};

module.exports = userController;