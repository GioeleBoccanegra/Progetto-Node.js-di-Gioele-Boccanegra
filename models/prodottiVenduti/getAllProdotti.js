const db = require('../../db');

const getAllProdotti = async ({ limit, offset }) => {
  const prodotti = await db('prodotti_venduti')
    .select('*')
    .limit(limit)
    .offset(offset);
  return prodotti;
};

module.exports = getAllProdotti;
