// controllers/utenti/getUtenti.js

const UtenteModel = require('../../models/utenti');

const getUtenti = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const limitInt = parseInt(limit, 10);
  const pageInt = parseInt(page, 10);
  const offset = (pageInt - 1) * limitInt;

  try {
    const utenti = await UtenteModel.getAllUtenti({ limit: limitInt, offset });
    res.status(200).json({
      page: pageInt,
      limit: limitInt,
      utenti: utenti
    });
  } catch (err) {
    console.error('Errore nel recupero degli utenti:', err);
    res.status(500).json({ err: 'Errore interno del server' });
  }
};

module.exports = getUtenti;
