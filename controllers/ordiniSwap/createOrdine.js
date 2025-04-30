const OrdineSwapModel = require('../../models/ordiniSwap');

const createOrdineSwap = async (req, res) => {
  const { data_ordine, utenti, prodotti } = req.body;

  if (!Array.isArray(utenti) || utenti.length === 0) {
    return res.status(400).json({ err: 'Fornire almeno un utente' });
  } else if (!Array.isArray(prodotti) || prodotti.length === 0) {
    return res.status(400).json({ err: 'Fornire almeno un prodotto' });
  }

  try {
    const ordineId = await OrdineSwapModel.createOrdine(data_ordine, utenti, prodotti);

    res.status(201).json({
      message: 'Ordine creato con successo',
      ordine_id: ordineId,
    });
  } catch (err) {
    console.error("Errore nella creazione dell'ordine:", err);
    res.status(500).json({ err: 'Errore interno del server' });
  }
};

module.exports =
  createOrdineSwap;
