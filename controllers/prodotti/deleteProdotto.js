const prodottiModel = require('../../models/prodottiVenduti');
const db = require('../../db');

const deleteProdotto = async (req, res) => {
  const { id } = req.params;
  try {
    const rowsAffected = await prodottiModel.deleteProdotto(id);
    if (rowsAffected === 0) {
      return res.status(404).json({ err: 'Il prodotto non esiste' });
    }
    res.status(200).json({ message: 'Prodotto eliminato con successo' });
  } catch (err) {
    console.error("Errore nella cancellazione del prodotto:", err);
    res.status(500).json({ err: 'Errore interno del server' });
  }
};

module.exports = deleteProdotto;
