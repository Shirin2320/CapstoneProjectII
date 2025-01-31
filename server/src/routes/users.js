const { models } = require('../database');
const bcrypt = require('bcrypt');
const express = require('express');

const router = express.Router();

function comparePassword(user, password, callback) {
    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err)
            return callback(err);
        
        callback(null, isMatch);
    });
}

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
		
        const existingUser = await models.User.findOne({ where: { username } });

        if (existingUser) {
            return res.status(409).json({ message: "Username or email already exists." });
        }

		const hash = bcrypt.hashSync(password, 10);
        const newUser = await models.User.create({ username, email, password: hash });

        res.status(201).json({ message: "User created successfully.", id: newUser.id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

		if (!username || !password) {
			return res.status(400).json({ message: "Username and password are required." });
		}

        const user = await models.User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        comparePassword(user, password, (err, isMatch) => {
            if (err)
                throw err;
            
            if (isMatch) {
                return res.status(200).json({ username: user.username, message: "User logged in successfully" });
            } else {
                return res.status(401).json({ message: "Invalid username or password" });
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;