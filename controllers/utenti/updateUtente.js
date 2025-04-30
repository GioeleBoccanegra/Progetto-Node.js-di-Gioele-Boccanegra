// controllers/utenti/updateUtente.js

const UtenteModel = require('../../models/utenteModel');

const updateUtente = async (req, res) => {
  const { id } = req.params;
  const { nome, cognome, email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nome || !cognome || !email) {
    return res.status(400).json({ err: 'Tutti i campi sono obbligatori' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ err: 'Email non valida' });
  }

  try {
    const rowsAffected = await UtenteModel.updateUtente(id, { nome, cognome, email });
    if (rowsAffected === 0) {
      return res.status(404).json({ err: 'Utente non trovato' });
    }
    res.status(200).json({ id, nome, cognome, email });
  } catch (err) {
    console.error('Errore nell\'aggiornamento dell\'utente:', err);
    res.status(500).json({ err: 'Errore interno del server' });
  }
};

module.exports = updateUtente;
