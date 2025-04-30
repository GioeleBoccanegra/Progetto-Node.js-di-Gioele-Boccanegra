const prodottiModel = require('../../models/prodottiVenduti');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const db = require('../../db');

const createProdotto = async (req, res) => {
  const { nome, numero_foto } = req.body;
  const immagini = req.files;

  if (!nome) {
    return res.status(400).json({ err: 'Il campo "nome" è obbligatorio' });
  } else if (!numero_foto) {
    return res.status(400).json({ err: 'Il campo "numero_foto" è obbligatorio' });
  }

  if (immagini.length !== parseInt(numero_foto, 10)) {
    return res.status(400).json({ err: 'Il numero delle immagini caricate non corrisponde al numero_foto fornito' });
  }

  try {
    const id = await prodottiModel.createProdotto({ nome, numero_foto });

    if (immagini && immagini.length > 0) {
      const immaginiData = immagini.map(file => ({
        prodotto_id: id,
        url: file.path,
        descrizione: file.originalname
      }));
      await db('immagini_prodotti').insert(immaginiData);
    }

    res.status(201).json({ id, nome, numero_foto, immagini: immagini.map(img => img.path) });
  } catch (err) {
    console.error('Errore nell\'inserimento del prodotto:', err);
    res.status(500).json({ err: 'Errore interno del server' });
  }
};

module.exports = createProdotto;
