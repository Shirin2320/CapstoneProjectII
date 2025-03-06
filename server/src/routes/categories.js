const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');

// Get all Categories
router.get('/', async (req, res) => {
    try {
        const categories = await categoriesController.getCategories()

        res.status(200).send(categories)
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// Get category by id 
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id 
        const categories = await categoriesController.getCategory(id)

        res.status(200).send(categories)
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// Get category by recipe 
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id 
        const categories = await categoriesController.getCategoryByRecipe(id)

        res.status(200).send(categories)
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// Get categories by question 
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id 
        const categories = await categoriesController.getCategoryByQuestion(id)

        res.status(200).send(categories)
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// Get category by dietary restriction 
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id 
        const categories = await categoriesController.getCategoryByDietaryRestriction(id)

        res.status(200).send(categories)
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// Add Category ??

// Delete category  ?

module.exports = router;