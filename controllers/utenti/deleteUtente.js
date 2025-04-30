// controllers/utenti/deleteUtente.js

const UtenteModel = require('../../models/utenti');

const deleteUtente = async (req, res) => {
  const { id } = req.params;
  try {
    const rowsAffected = await UtenteModel.deleteUtente(id);
    if (rowsAffected === 0) {
      return res.status(404).json({ err: 'Utente non trovato' });
    }
    res.status(200).json({ message: 'Utente eliminato con successo' });
  } catch (err) {
    console.error('Errore nella cancellazione dell\'utente:', err);
    res.status(500).json({ err: 'Errore interno del server' });
  }
};

module.exports = deleteUtente;
