const prodottiModel = require('../../models/prodottiModel');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const db = require('../../db');

const updateProdotto = async (req, res) => {
  const { id } = req.params;
  const { nome, numero_foto } = req.body;
  const immagini = req.files;

  if (!nome) {
    return res.status(400).json({ err: 'Il campo "nome" è obbligatorio' });
  } else if (!numero_foto) {
    return res.status(400).json({ err: 'Il campo "numero_foto" è obbligatorio' });
  }

  try {
    // Crea oggetto dati da aggiungere
    const updateProdotto = {};
    if (nome) updateProdotto.nome = nome;
    if (numero_foto) updateProdotto.numero_foto = numero_foto;

    // Esegui aggiornamento
    const rowsAffected = await prodottiModel.updateProdotto(id, updateProdotto);

    if (rowsAffected === 0) {
      return res.status(404).json({ err: 'Il prodotto non esiste' });
    }

    if (immagini.length > 0) {
      await db('immagini_prodotti').where('prodotto_id', id).del();

      const immaginiData = immagini.map(file => ({
        prodotto_id: id,
        url: file.path,
        descrizione: file.originalname
      }));
      await db('immagini_prodotti').insert(immaginiData);
    }

    res.status(200).json({ id, ...updateProdotto, immagini: immagini.map(img => img.path) });
  } catch (err) {
    console.error("Errore nell'aggiornamento del prodotto:", err);
    res.status(500).json({ err: 'Errore interno del server' });
  }
};

module.exports = updateProdotto;