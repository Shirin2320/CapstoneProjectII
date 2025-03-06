const express = require('express');
const router = express.Router();
const mlController = require('../controllers/meal_history');

// Get users history 
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        await mlController.getMealHistory(id)

        res.status(204).json({message: "Sucessfully got meal histroy."})
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// Add to MealHistory
router.post('/update/mealHistory', async (req, res) => {
    try{ 
        const { id, recipeId } = req.body

        await mlController.addMealHistory(id, recipeId)

        res.status(204).json({message: "Sucessfully added to  meal history."})
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// Delete from Meal history 
router.delete('/', async (req, res) => {
    try {
        const { id, recipe } = req.body

        await mlController.deleteMealHistory(id, recipe)

        res.status(204).json({message: "Sucessfully updated allergies."})
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router