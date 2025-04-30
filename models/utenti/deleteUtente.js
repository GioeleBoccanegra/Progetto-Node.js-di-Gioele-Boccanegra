const db = require('../../db');

const deleteUtente = async (id) => {
  const rowsAffected = await db('utenti').where('id', id).delete();
  return rowsAffected;
};

module.exports = deleteUtente;
