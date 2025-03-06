const express = require('express');
const router = express.Router();
const allergiesController = require('../controllers/allergies');

// Update Allergies 
router.put('/update/allergies', async (req, res) => {
    try{
        const { id, allergies } = req.body

        await allergiesController.updateAllergies(id, allergies)

        res.status(204).json({message: "Sucessfully updated allergies."})
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})