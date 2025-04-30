const db = require('../../db');

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

module.exports = deleteOrdine;
