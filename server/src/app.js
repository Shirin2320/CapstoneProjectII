const express = require('express');
const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.send("COMP 3078 Capstone Project"));

app.use('/api/user', userRoutes);
app.use('/api/recipe', recipeRoutes);

module.exports = app;
