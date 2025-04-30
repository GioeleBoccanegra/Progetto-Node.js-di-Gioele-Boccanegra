const OrdineSwapModel = require('../../models/ordiniSwapModel');

const deleteOrdineSwap = async (req, res) => {
  const ordineId = req.params.id;

  try {
    await OrdineSwapModel.deleteOrdine(ordineId);

    res.status(200).json({
      message: 'Ordine eliminato con successo',
    });
  } catch (err) {
    console.error("Errore nell'eliminazione dell'ordine:", err);
    res.status(500).json({ err: 'Errore interno del server' });
  }
};

module.exports =
  deleteOrdineSwap;
