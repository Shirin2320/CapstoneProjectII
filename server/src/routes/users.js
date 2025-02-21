const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
		
        const newUser = await userController.createUser(username, email, password);

        res.status(201).json({ message: "User created successfully.", id: newUser.id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const success = await userController.loginUser(username, password);

        if (success) {
            res.status(200).json({ message: "Login successful." });
        } else {
            res.status(401).json({ message: "Invalid username or password." });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;