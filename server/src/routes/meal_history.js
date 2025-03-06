const express = require('express');
const router = express.Router();
const mlController = require('../controllers/meal_history');

// Add to MealHistory
router.post('/update/mealHistory', async (req, res) => {
    try{ 
        const { id, recipeId } = req.body

        await mlController.updateMealHistory(id, recipeId)

        res.status(204).json({message: "Sucessfully updated meal history."})
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})