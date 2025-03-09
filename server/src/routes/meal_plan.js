const express = require('express');
const router = express.Router();
const mealPlanController = require('../controllers/meal_plan');

// Get all plans 
router.get('/', async (req, res) => {
    try {
        const plans = await mealPlanController.getAllPlans();

        res.status(200).send(plans);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const plan = await mealPlanController.getDailyPlan(req.params.id);
        res.status(200).send(plan)
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/create/:userId', async (req, res) => {
    try {
        await mealPlanController.generateMealPlan(req.params.userId);

        res.status(201).json({message: "Sucessfully created new meal plan."})
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router