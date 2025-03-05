const express = require('express');
const router = express.Router();
const { models } = require('../database');

router.get('/', async (req, res) => {
    try{
        const response = await models.Questionnaire.findAll()
        res.send(response) 

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id
        const response = await models.Questionnaire.findById(id)
        
        res.send(response) 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;