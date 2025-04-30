// routes/utentiRoutes.js

const express = require('express');
const router = express.Router();
const utentiController = require('../controllers');

// Routes per gli utenti
router.get('/', utentiController.getUtenti);
router.post('/', utentiController.createUtente);
router.put('/:id', utentiController.updateUtente);
router.delete('/:id', utentiController.deleteUtente);

module.exports = router;
