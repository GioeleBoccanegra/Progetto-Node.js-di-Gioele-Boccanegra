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
  const { nome, numero_foto } = req.body

  if (!nome) {
    return res.status(400).json({ err: 'Il campo "nome" è obbligatorio' })
  } else if (!numero_foto) {
    return res.status(400).json({ err: 'Il campo "numero_foto" è obbligatorio' })
  }

  try {
    const [id] = await db('prodotti_venduti').insert({ nome, numero_foto })
    res.status(201).json({ id, nome, numero_foto })
  } catch (err) {
    console.error('Errore nell\'inserimento del prodotto:', err);
    res.status(500).json({ err: 'Errore interno del server' });
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { nome, numero_foto } = req.body

  if (!nome) {
    return res.status(400).json({ err: 'Il campo "nome" è obbligatorio' })
  } else if (!numero_foto) {
    return res.status(400).json({ err: 'Il campo "numero_foto" è obbligatorio' })
  }

  try {
    //crea oggetto dati da aggiungere
    const updateProdotto = {}
    if (nome) updateProdotto.nome = nome
    if (numero_foto) updateProdotto.numero_foto = numero_foto

    //esegue aggiornamento:
    const rowsAffected = await db('prodotti_venduti').where('id', id).update(updateProdotto)

    if (rowsAffected === 0) {
      return res.status(404).json({ err: 'Il prodotto non esiste' })
    }
    res.status(200).json({ id, ...updateProdotto });
  } catch (err) {
    console.error("Errore nell'aggiornamento del prodotto:", err);
    res.status(500).json({ err: 'Errore interno del server' });
  }
})


module.exports = router;