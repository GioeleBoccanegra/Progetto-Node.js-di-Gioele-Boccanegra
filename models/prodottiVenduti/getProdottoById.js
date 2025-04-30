const db = require('../../db');

const getProdottoById = async (id) => {
  const prodotto = await db('prodotti_venduti').where('id', id).first();
  return prodotto;
};

module.exports = getProdottoById;
