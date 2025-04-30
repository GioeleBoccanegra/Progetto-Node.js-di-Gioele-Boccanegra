const db = require('../../db');

const createProdotto = async (prodottoData) => {
  const [id] = await db('prodotti_venduti').insert(prodottoData);
  return id;
};

module.exports = createProdotto;
