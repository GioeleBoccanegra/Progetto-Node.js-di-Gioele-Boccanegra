const db = require('../../db');

const createOrdine = async (data_ordine, utenti, prodotti) => {
  const trx = await db.transaction();

  try {
    const [ordineId] = await trx('ordini_swap').insert({ data_ordine });

    await Promise.all(
      utenti.map(utenteId =>
        trx('ordini_swap_utenti').insert({ ordine_swap_id: ordineId, utente_id: utenteId })
      )
    );

    await Promise.all(
      prodotti.map(prodottoId =>
        trx('ordini_swap_prodotti').insert({ ordine_swap_id: ordineId, prodotto_id: prodottoId })
      )
    );

    await trx.commit();
    return ordineId;
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};

module.exports = createOrdine;
