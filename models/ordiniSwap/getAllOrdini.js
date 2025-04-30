const db = require('../../db');

const getAllOrdini = async ({ data_ordine, nome_prodotto, page = 1, limit = 10 }) => {
  const limitInt = parseInt(limit);
  const pageInt = parseInt(page);
  const offset = (pageInt - 1) * limitInt;

  let countQuery = db('ordini_swap as o')
    .join('ordini_swap_prodotti as op', 'o.id', 'op.ordine_swap_id')
    .join('prodotti_venduti as p', 'op.prodotto_id', 'p.id');

  if (nome_prodotto) {
    countQuery = countQuery.where('p.nome', 'like', `%${nome_prodotto}%`);
  }

  if (data_ordine) {
    countQuery = countQuery.where('o.data_ordine', data_ordine);
  }

  const totalCountResult = await countQuery.countDistinct('o.id as count');
  const totalCount = totalCountResult[0].count;

  let query = db('ordini_swap as o')
    .select('o.id as ordine_id', 'o.data_ordine')
    .join('ordini_swap_prodotti as op', 'o.id', 'op.ordine_swap_id')
    .join('prodotti_venduti as p', 'op.prodotto_id', 'p.id')
    .distinct();

  if (nome_prodotto) {
    query = query.where('p.nome', 'like', `%${nome_prodotto}%`);
  }

  if (data_ordine) {
    query = query.where('o.data_ordine', data_ordine);
  }

  query = query.limit(limitInt).offset(offset);

  const ordiniSwap = await query;

  const ordiniConDettagli = await Promise.all(ordiniSwap.map(async (ordine) => {
    const ordineId = ordine.ordine_id;

    const utentiSwap = await db('ordini_swap_utenti as ou')
      .join('utenti as u', 'ou.utente_id', 'u.id')
      .select('u.id as utente_id', 'u.nome as utente_nome', 'u.cognome as utente_cognome', 'u.email as utente_email')
      .where('ou.ordine_swap_id', ordineId).distinct();

    const prodottiSwap = await db('ordini_swap_prodotti as op')
      .join('prodotti_venduti as p', 'op.prodotto_id', 'p.id')
      .select('p.id as prodotto_id', 'p.nome as prodotto_nome', 'p.numero_foto')
      .where('op.ordine_swap_id', ordineId).distinct();

    return {
      ordine_id: ordineId,
      data_ordine: ordine.data_ordine,
      utenti: utentiSwap,
      prodotti: prodottiSwap,
    };
  }));

  return { ordiniSwap: ordiniConDettagli, totalCount };
};

module.exports = getAllOrdini;
