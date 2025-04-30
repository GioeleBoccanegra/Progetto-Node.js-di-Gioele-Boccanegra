const db = require('../../db');

const deleteProdotto = async (id) => {
  const rowsAffected = await db('prodotti_venduti').where('id', id).delete();
  return rowsAffected;
};

module.exports = deleteProdotto;
