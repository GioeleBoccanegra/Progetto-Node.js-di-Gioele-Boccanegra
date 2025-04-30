const OrdineSwapModel = require('../../models/ordiniSwap');

const getOrdiniSwap = async (req, res) => {
  try {
    const { data_ordine, nome_prodotto, page = 1, limit = 10 } = req.query;
    const { ordiniSwap, totalCount } = await OrdineSwapModel.getAllOrdini({ data_ordine, nome_prodotto, page, limit });
    const limite = parseInt(limit)
    res.status(200).json({
      page,
      limit: limite,
      totalPages: Math.ceil(totalCount / limite),
      ordini: ordiniSwap,
    });
  } catch (err) {
    console.error('Errore nel recupero degli ordini:', err);
    res.status(500).json({ err: 'Errore interno del server' });
  }
};

module.exports =
  getOrdiniSwap
