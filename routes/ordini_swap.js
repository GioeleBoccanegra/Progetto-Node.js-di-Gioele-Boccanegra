const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.get('/', async (req, res) => {
  try {
    const ordini_swap = await db('ordini_swap as o')
      .leftJoin('ordini_swap_prodotti as op', 'o.id', 'op.prodotto_id')
      .leftJoin('ordini_swap_utenti as ou', 'o.id', 'ou.utente_id')
      .leftJoin('utenti as u', 'ou.utente_id', 'u.id')
      .leftJoin('prodotti_venduti as p', 'op.prodotto_id', 'p.id')
      .select(
        'o.id as ordine_id',
        'o.created_at',
        'u.id as utente_id',
        'u.nome as utente_nome',
        'u.cognome',
        'u.email',
        'p.id as prodotto_id',
        'p.nome as prodotto_nome',
        'p.numero_foto'
      )

    res.status(200).json(ordini_swap);
  } catch (err) {
    console.error('Errore nel recupero dei prodotti:', err);
    res.status(500).json({ err: 'Errore interno del server' });
  }
})

router.post('/', async (req, res) => {
  const { data_ordine, utenti, prodotti } = req.body;

  if (!Array.isArray(utenti) || utenti.length === 0) {
    return res.status(400).json({ err: 'Fornire almeno un utente' });
  } else if (!Array.isArray(prodotti) || prodotti.length === 0) {
    return res.status(400).json({ err: 'Fornire almeno un prodotto' });
  }

  try {
    const trx = await db.transaction();

    // Inserisci l'ordine e ottieni l'ID
    const [ordineId] = await trx('ordini_swap').insert({
      data_ordine,
    });

    // Recupera l'ordine appena inserito
    const ordine = await trx('ordini_swap').where('id', ordineId).first();

    // Inserisci gli utenti associati all'ordine (evita duplicati)
    await Promise.all(
      utenti.map(utenteId => trx('ordini_swap_utenti').insert({ ordine_swap_id: ordine.id, utente_id: utenteId }))
    );

    // Inserisci i prodotti associati all'ordine (evita duplicati)
    await Promise.all(
      prodotti.map(prodottoId => trx('ordini_swap_prodotti').insert({ ordine_swap_id: ordine.id, prodotto_id: prodottoId }))
    );

    const ordineCreato = await trx('ordini_swap')
      .where('id', ordine.id)
      .first();

    const utentiSwap = await trx('ordini_swap_utenti as ou')
      .join('utenti as u', 'ou.utente_id', 'u.id')
      .select(
        'u.id as utente_id',
        'u.nome as utente_nome',
        'u.cognome as utente_cognome',
        'u.email as utente_email'
      )
      .where('ou.ordine_swap_id', ordine.id)
      .distinct(); // Evita duplicati anche qui

    // Recupera prodotti associati
    const prodottiSwap = await trx('ordini_swap_prodotti as op')
      .join('prodotti_venduti as p', 'op.prodotto_id', 'p.id')
      .select(
        'p.id as prodotto_id',
        'p.nome as prodotto_nome',
        'p.numero_foto'
      )
      .where('op.ordine_swap_id', ordine.id)
      .distinct(); // E

    await trx.commit();

    const utentiDettagliati = utentiSwap.map(ordine => ({
      utente_id: ordine.utente_id,
      utente_nome: ordine.utente_nome,
      utente_cognome: ordine.cognome,
      utente_email: ordine.email
    }));

    const prodottiDettagliati = prodottiSwap.map(ordine => ({
      prodotto_id: ordine.prodotto_id,
      prodotto_nome: ordine.prodotto_nome,
      numero_foto: ordine.numero_foto
    }));

    res.status(201).json({
      message: 'Ordine creato con successo',
      ordine: {
        ordine_id: ordineId,
        data_ordine: ordineCreato.data_ordine,
        utenti: utentiDettagliati,
        prodotti: prodottiDettagliati
      }
    });

  } catch (err) {
    console.error("Errore nell'aggiornamento del prodotto:", err);
    res.status(500).json({ err: 'Errore interno del server' });
  }
});








router.put('/:id', async (req, res) => {
  const ordineId = req.params.id
  const { data_ordine, utenti, prodotti } = req.body;

  if (!Array.isArray(utenti) || utenti.length === 0) {
    return res.status(400).json({ err: 'Fornire almeno un utente' });
  } else if (!Array.isArray(prodotti) || prodotti.length === 0) {
    return res.status(400).json({ err: 'Fornire almeno un prodotto' });
  }

  try {
    const trx = await db.transaction();
    const updated_at = new Date();

    // Inserisci l'ordine e ottieni l'ID
    const ordineEsistente = await trx('ordini_swap').where({ id: ordineId }).first()
    if (!ordineEsistente) {
      await trx.rollback()
      return res.status(404).json({ err: 'Ordine non trovato' });
    }

    await trx('ordini_swap')
      .where({ id: ordineId })
      .update({ data_ordine, updated_at })


    await trx('ordini_swap_prodotti').where({ ordine_swap_id: ordineId }).del()
    await trx('ordini_swap_utenti').where({ ordine_swap_id: ordineId }).del()



    // Inserisci gli utenti associati all'ordine (evita duplicati)
    await Promise.all(
      utenti.map(utenteId => trx('ordini_swap_utenti').insert({ ordine_swap_id: ordineId, utente_id: utenteId }))
    );

    // Inserisci i prodotti associati all'ordine (evita duplicati)
    await Promise.all(
      prodotti.map(prodottoId => trx('ordini_swap_prodotti').insert({ ordine_swap_id: ordineId, prodotto_id: prodottoId }))
    );

    const ordineCreato = await trx('ordini_swap')
      .where('id', ordineId)
      .first();

    const utentiSwap = await trx('ordini_swap_utenti as ou')
      .join('utenti as u', 'ou.utente_id', 'u.id')
      .select(
        'u.id as utente_id',
        'u.nome as utente_nome',
        'u.cognome as utente_cognome',
        'u.email as utente_email'
      )
      .where('ou.ordine_swap_id', ordineId)
      .distinct(); // Evita duplicati anche qui

    // Recupera prodotti associati
    const prodottiSwap = await trx('ordini_swap_prodotti as op')
      .join('prodotti_venduti as p', 'op.prodotto_id', 'p.id')
      .select(
        'p.id as prodotto_id',
        'p.nome as prodotto_nome',
        'p.numero_foto'
      )
      .where('op.ordine_swap_id', ordineId)
      .distinct(); // E

    await trx.commit();

    const utentiDettagliati = utentiSwap.map(ordine => ({
      utente_id: ordine.utente_id,
      utente_nome: ordine.utente_nome,
      utente_cognome: ordine.cognome,
      utente_email: ordine.email
    }));

    const prodottiDettagliati = prodottiSwap.map(ordine => ({
      prodotto_id: ordine.prodotto_id,
      prodotto_nome: ordine.prodotto_nome,
      numero_foto: ordine.numero_foto
    }));

    res.status(201).json({
      message: 'Ordine creato con successo',
      ordine: {
        ordine_id: ordineId,
        data_aggiornamento: ordineCreato.updated_at,
        utenti: utentiDettagliati,
        prodotti: prodottiDettagliati
      }
    });

  } catch (err) {
    console.error("Errore nell'aggiornamento del prodotto:", err);
    res.status(500).json({ err: 'Errore interno del server' });
  }
});




router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const rowsAffected = await db('prodotti_venduti').where('id', id).delete()
    if (rowsAffected === 0) {
      return res.status(404).json({ err: 'Il prodotto non esiste' })
    }
    res.status(200).json({ message: 'Prodotto eliminato con successo' });
  } catch (err) {
    console.error("Errore nella cancellazione del prodotto:", err);
    res.status(500).json({ err: 'Errore interno del server' });
  }

})


module.exports = router;