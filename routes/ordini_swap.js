const express = require('express');
const router = express.Router();
const ordiniController = require('../controllers');

router.get('/', ordiniController.getOrdini);
router.post('/', ordiniController.createOrdini);
router.put('/:id', ordiniController.updateOrdini);
router.delete('/:id', ordiniController.deleteOrdini);

module.exports = router;