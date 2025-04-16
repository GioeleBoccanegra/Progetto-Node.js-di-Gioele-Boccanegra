const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.get('/', async (req, res) => {
  try {
    const prodotti = await db('prodotti_venduti').select('*')
    res.status(200).json(prodotti)
  } catch (err) {
    console.error('Errore nel recupero dei prodotti:', err);
    res.status(500).json({ err: 'Errore interno del server' });
  }
})

router.post('/', async (req, res) => {
  const { nome } = req.body

  if (!nome) {
    return res.status(400).json({ err: 'Il campo "nome" è obbligatorio' })
  }

  try {
    const [id] = await db('prodotti_venduti').insert({ nome })
    res.status(201).json({ id, nome })
  } catch (err) {
    console.error('Errore nell\'inserimento del prodotto:', err);
    res.status(500).json({ err: 'Errore interno del server' });
  }
})


module.exports = router;