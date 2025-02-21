const { get } = require('../app');
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
            user.username = username;
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
};

module.exports = userController;