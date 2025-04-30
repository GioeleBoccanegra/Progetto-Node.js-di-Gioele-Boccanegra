const db = require('../../db');

const updateProdotto = async (id, prodottoData) => {
  const rowsAffected = await db('prodotti_venduti').where('id', id).update(prodottoData);
  return rowsAffected;
};

module.exports = updateProdotto;
