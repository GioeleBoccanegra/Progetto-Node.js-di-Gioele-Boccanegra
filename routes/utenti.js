const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query
  const limitInt = parseInt(limit);
  const pageInt = parseInt(page);
  const offset = (pageInt - 1) * limitInt;
  try {
    const utenti = await db('utenti')
      .select('*')
      .limit(limitInt)
      .offset(offset);
    res.status(200).json({
      page: pageInt,
      limit: limitInt, utenti: utenti
    })
  } catch (err) {
    console.error('Errore nel recupero dei utenti:', err);
    res.status(500).json({ err: 'Errore interno del server' });
  }
})

router.post('/', async (req, res) => {
  const { nome, cognome, email } = req.body
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nome) {
    return res.status(400).json({ err: 'Il campo "nome" è obbligatorio' })
  } else if (!cognome) {
    return res.status(400).json({ err: 'Il campo "cognome" è obbligatorio' })
  } else if (!email) {
    return res.status(400).json({ err: 'Il campo "email" è obbligatorio' })
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ err: 'Email non valida' });
  }

  try {
    const [id] = await db('utenti').insert({ nome, cognome, email })
    res.status(201).json({ id, nome, cognome, email })
  } catch (err) {
    console.error('Errore nell\'inserimento del prodotto:', err);
    res.status(500).json({ err: 'Errore interno del server' });
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { nome, cognome, email } = req.body
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nome) {
    return res.status(400).json({ err: 'Il campo "nome" è obbligatorio' })
  } else if (!cognome) {
    return res.status(400).json({ err: 'Il campo "cognome" è obbligatorio' })
  } else if (!email) {
    return res.status(400).json({ err: 'Il campo "email" è obbligatorio' })
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ err: 'Email non valida' });
  }


  try {
    //crea oggetto dati da aggiungere
    const updateUtente = {}
    if (nome) updateUtente.nome = nome
    if (cognome) updateUtente.cognome = cognome
    if (email) updateUtente.email = email

    //esegue aggiornamento:
    const rowsAffected = await db('utenti').where('id', id).update(updateUtente)

    if (rowsAffected === 0) {
      return res.status(404).json({
        err: "l'utente non esiste"
      })
    }
    res.status(200).json({ id, ...updateUtente });
  } catch (err) {
    console.error("Errore nell'aggiornamento dell utente:", err);
    res.status(500).json({ err: 'Errore interno del server' });
  }
})


router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const rowsAffected = await db('utenti').where('id', id).delete()
    if (rowsAffected === 0) {
      return res.status(404).json({ err: 'l utente non esiste' })
    }
    res.status(200).json({ message: 'Utente eliminato con successo' });
  } catch (err) {
    console.error("Errore nella cancellazione dell utente:", err);
    res.status(500).json({ err: 'Errore interno del server' });
  }

})


module.exports = router;