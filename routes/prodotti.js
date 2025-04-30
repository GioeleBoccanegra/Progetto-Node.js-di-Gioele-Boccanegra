const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const prodottiController = require('../controllers');


// Routes per i prodotti
router.post('/', upload.array('immagini', 10), prodottiController.createProdotti);
router.put('/:id', upload.array('immagini', 10), prodottiController.updateProdotti);
router.delete('/:id', prodottiController.deleteProdotti);

module.exports = router;
