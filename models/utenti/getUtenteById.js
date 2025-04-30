const db = require('../../db');

const getUtenteById = async (id) => {
  return db('utenti').select('*').where('id', id).first();
};

module.exports = getUtenteById;
