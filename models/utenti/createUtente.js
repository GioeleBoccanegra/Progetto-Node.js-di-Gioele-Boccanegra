const db = require('../../db');

const createUtente = async ({ nome, cognome, email }) => {
  const [id] = await db('utenti').insert({ nome, cognome, email });
  return { id, nome, cognome, email };
};

module.exports = createUtente;
