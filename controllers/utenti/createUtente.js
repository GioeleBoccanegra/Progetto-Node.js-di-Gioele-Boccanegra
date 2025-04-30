// controllers/utenti/createUtente.js

const UtenteModel = require('../../models/utenteModel');

const createUtente = async (req, res) => {
  const { nome, cognome, email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nome || !cognome || !email) {
    return res.status(400).json({ err: 'Tutti i campi sono obbligatori' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ err: 'Email non valida' });
  }

  try {
    const utente = await UtenteModel.createUtente({ nome, cognome, email });
    res.status(201).json(utente);
  } catch (err) {
    console.error('Errore nell\'inserimento dell\'utente:', err);
    res.status(500).json({ err: 'Errore interno del server' });
  }
};

module.exports = createUtente;
