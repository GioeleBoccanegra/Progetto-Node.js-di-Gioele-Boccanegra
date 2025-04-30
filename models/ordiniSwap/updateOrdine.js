const db = require('../../db');

const updateOrdine = async (ordineId, data_ordine, utenti, prodotti) => {
  const trx = await db.transaction();
  const updated_at = new Date();

  try {
    await trx('ordini_swap')
      .where({ id: ordineId })
      .update({ data_ordine, updated_at });

    await trx('ordini_swap_prodotti').where({ ordine_swap_id: ordineId }).del();
    await trx('ordini_swap_utenti').where({ ordine_swap_id: ordineId }).del();

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

module.exports = updateOrdine;
