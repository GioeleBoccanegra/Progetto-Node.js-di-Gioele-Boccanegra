const db = require('../db');

// Funzione per inserire un nuovo prodotto
const createProdotto = async (prodottoData) => {
  const [id] = await db('prodotti_venduti').insert(prodottoData);
  return id;
};

// Funzione per aggiornare un prodotto esistente
const updateProdotto = async (id, prodottoData) => {
  const rowsAffected = await db('prodotti_venduti').where('id', id).update(prodottoData);
  return rowsAffected;
};

// Funzione per eliminare un prodotto
const deleteProdotto = async (id) => {
  const rowsAffected = await db('prodotti_venduti').where('id', id).delete();
  return rowsAffected;
};

// Funzione per ottenere tutti i prodotti
const getAllProdotti = async (pagination) => {
  const { limit, offset } = pagination;
  const prodotti = await db('prodotti_venduti')
    .select('*')
    .limit(limit)
    .offset(offset);
  return prodotti;
};

// Funzione per ottenere un prodotto specifico
const getProdottoById = async (id) => {
  const prodotto = await db('prodotti_venduti').where('id', id).first();
  return prodotto;
};

module.exports = {
  createProdotto,
  updateProdotto,
  deleteProdotto,
  getAllProdotti,
  getProdottoById
};
