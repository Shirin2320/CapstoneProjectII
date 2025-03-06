const express = require('express');
const router = express.Router();
const restrictionsController = require('../controllers/dietary_restrictions');

// Get all restrictions 
router.get('/', async (req, res) => {
    try {
        const restrictions = await restrictionsController.getRestrictions()

        res.status(200).send(restrictions)
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// Get restrictions by id
router.get('/:id', async (req, res) => {
    try {
        const restriction = await restrictionsController.getRestriction(req.params.id)
        
        res.status(200).send(restriction)
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// Create new restriction 
router.post('/create/:name', async (req, res) => {
    try {
        await restrictionsController.addRestriction(req.params.name)
        
        res.status(204).json({message: "Sucessfully updated allergies."})
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

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

module.exports = router