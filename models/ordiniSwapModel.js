const db = require('../db');  // Assicurati di avere la connessione al database configurata correttamente


// Funzione per recuperare gli ordini
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

  // Mappa gli ordini per ottenere i dettagli associati
  const ordiniConDettagli = await Promise.all(ordiniSwap.map(async (ordine) => {
    const ordineId = ordine.ordine_id
    if (!ordineId) {
      return res.status(404).json({ err: 'ne3ssun ordine trovato' });
    }

    const utentiSwap = await db('ordini_swap_utenti as ou')
      .join('utenti as u', 'ou.utente_id', 'u.id')
      .select(
        'u.id as utente_id',
        'u.nome as utente_nome',
        'u.cognome as utente_cognome',
        'u.email as utente_email'
      )
      .where('ou.ordine_swap_id', ordineId).distinct()

    const prodottiSwap = await db('ordini_swap_prodotti as op')
      .join('prodotti_venduti as p', 'op.prodotto_id', 'p.id')
      .select(
        'p.id as prodotto_id',
        'p.nome as prodotto_nome',
        'p.numero_foto'
      )
      .where('op.ordine_swap_id', ordineId).distinct()

    const utentiDettagliati = utentiSwap.map(utente => ({
      utente_id: utente.utente_id,
      utente_nome: utente.utente_nome,
      utente_cognome: utente.utente_cognome,
      utente_email: utente.utente_email
    }));

    const prodottiDettagliati = prodottiSwap.map(prodotto => ({
      prodotto_id: prodotto.prodotto_id,
      prodotto_nome: prodotto.prodotto_nome,
      numero_foto: prodotto.numero_foto
    }));

    // Restituisci l'ordine con i dettagli associati
    return {
      ordine_id: ordineId,
      data_ordine: ordine.data_ordine,
      utenti: utentiDettagliati,
      prodotti: prodottiDettagliati
    };

  }));

  console.log(ordiniConDettagli)

  return { ordiniSwap: ordiniConDettagli, totalCount };
};



// Funzione per creare un nuovo ordine
const createOrdine = async (data_ordine, utenti, prodotti) => {
  const trx = await db.transaction();

  try {
    const [ordineId] = await trx('ordini_swap').insert({ data_ordine });

    // Inserisci utenti e prodotti
    await Promise.all(
      utenti.map(utenteId => trx('ordini_swap_utenti').insert({ ordine_swap_id: ordineId, utente_id: utenteId }))
    );
    await Promise.all(
      prodotti.map(prodottoId => trx('ordini_swap_prodotti').insert({ ordine_swap_id: ordineId, prodotto_id: prodottoId }))
    );

    await trx.commit();
    return ordineId;
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};

// Funzione per aggiornare un ordine esistente
const updateOrdine = async (ordineId, data_ordine, utenti, prodotti) => {
  const trx = await db.transaction();
  const updated_at = new Date();

  try {
    // Aggiorna l'ordine
    await trx('ordini_swap')
      .where({ id: ordineId })
      .update({ data_ordine, updated_at });

    // Elimina gli utenti e prodotti esistenti per questo ordine
    await trx('ordini_swap_prodotti').where({ ordine_swap_id: ordineId }).del();
    await trx('ordini_swap_utenti').where({ ordine_swap_id: ordineId }).del();

    // Inserisci gli utenti e i prodotti
    await Promise.all(
      utenti.map(utenteId => trx('ordini_swap_utenti').insert({ ordine_swap_id: ordineId, utente_id: utenteId }))
    );
    await Promise.all(
      prodotti.map(prodottoId => trx('ordini_swap_prodotti').insert({ ordine_swap_id: ordineId, prodotto_id: prodottoId }))
    );

    await trx.commit();
    return ordineId;
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};

// Funzione per eliminare un ordine
const deleteOrdine = async (ordineId) => {
  const trx = await db.transaction();

  try {
    await trx('ordini_swap').where({ id: ordineId }).del();
    await trx.commit();
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};

module.exports = {
  getAllOrdini,
  createOrdine,
  updateOrdine,
  deleteOrdine,
};
