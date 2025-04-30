const OrdineSwapModel = require('../../models/ordiniSwapModel');

const updateOrdineSwap = async (req, res) => {
  const ordineId = req.params.id;
  const { data_ordine, utenti, prodotti } = req.body;

  if (!Array.isArray(utenti) || utenti.length === 0) {
    return res.status(400).json({ err: 'Fornire almeno un utente' });
  } else if (!Array.isArray(prodotti) || prodotti.length === 0) {
    return res.status(400).json({ err: 'Fornire almeno un prodotto' });
  }

  try {
    const updatedOrdine = await OrdineSwapModel.updateOrdine(ordineId, data_ordine, utenti, prodotti);

    res.status(200).json({
      message: 'Ordine aggiornato con successo',
      ordine_id: updatedOrdine,
    });
  } catch (err) {
    console.error("Errore nell'aggiornamento dell'ordine:", err);
    res.status(500).json({ err: 'Errore interno del server' });
  }
};

module.exports =
  updateOrdineSwap;

