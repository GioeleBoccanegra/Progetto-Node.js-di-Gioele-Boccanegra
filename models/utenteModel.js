const db = require('../db');

const UtenteModel = {
  async getAllUtenti({ limit, offset }) {
    return db('utenti')
      .select('*')
      .limit(limit)
      .offset(offset);
  },

  async getUtenteById(id) {
    return db('utenti').select('*').where('id', id).first();
  },

  async createUtente({ nome, cognome, email }) {
    const [id] = await db('utenti').insert({ nome, cognome, email });
    return { id, nome, cognome, email };
  },

  async updateUtente(id, { nome, cognome, email }) {
    const rowsAffected = await db('utenti').where('id', id).update({ nome, cognome, email });
    return rowsAffected;
  },

  async deleteUtente(id) {
    const rowsAffected = await db('utenti').where('id', id).delete();
    return rowsAffected;
  }
};

module.exports = UtenteModel;