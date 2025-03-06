const express = require('express');
const router = express.Router();
const restrictionsController = require('../controllers/dietary_restrictions');

// Update Dietary Restrictions
router.put('/update/dietaryRestrictions', async (req, res) => {
    try{
        const { id, dietaryRestrictions } = req.body

        await restrictionsController.updateDietaryRestrictions(id, dietaryRestrictions)

        res.status(204).json({message: "Sucessfully updated dietary restrictions."})
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})