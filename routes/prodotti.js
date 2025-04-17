//prodotti.js

const express = require('express');
const router = express.Router();
const db = require('../db.js');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });


router.post('/', upload.array('immagini', 10), async (req, res) => {
  const { nome, numero_foto } = req.body
  const immagini = req.files;

  if (!nome) {
    return res.status(400).json({ err: 'Il campo "nome" è obbligatorio' })
  } else if (!numero_foto) {
    return res.status(400).json({ err: 'Il campo "numero_foto" è obbligatorio' })
  }

  if (immagini.length !== parseInt(numero_foto, 10)) {
    return res.status(400).json({ err: 'Il numero delle immagini caricate non corrisponde al numero_foto fornito' });
  }

  try {
    const [id] = await db('prodotti_venduti').insert({ nome, numero_foto })

    if (immagini && immagini.length > 0) {
      const immaginiData = immagini.map(file => ({
        prodotto_id: id,
        url: file.path,
        descrizione: file.originalname
      }))
      await db('immagini_prodotti').insert(immaginiData);
    }
    res.status(201).json({ id, nome, numero_foto, immagini: immagini.map(img => img.path) })
  } catch (err) {
    console.error('Errore nell\'inserimento del prodotto:', err);
    res.status(500).json({ err: 'Errore interno del server' });
  }
})

router.put('/:id', upload.array('immagini', 10), async (req, res) => {
  const { id } = req.params
  const { nome, numero_foto } = req.body
  const immagini = req.files

  if (!nome) {
    return res.status(400).json({ err: 'Il campo "nome" è obbligatorio' })
  } else if (!numero_foto) {
    return res.status(400).json({ err: 'Il campo "numero_foto" è obbligatorio' })
  }

  try {
    //crea oggetto dati da aggiungere
    const updateProdotto = {}
    if (nome) updateProdotto.nome = nome
    if (numero_foto) updateProdotto.numero_foto = numero_foto

    //esegue aggiornamento:
    const rowsAffected = await db('prodotti_venduti').where('id', id).update(updateProdotto)

    if (rowsAffected === 0) {
      return res.status(404).json({ err: 'Il prodotto non esiste' })
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
})


router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const rowsAffected = await db('prodotti_venduti').where('id', id).delete()
    if (rowsAffected === 0) {
      return res.status(404).json({ err: 'Il prodotto non esiste' })
    }
    res.status(200).json({ message: 'Prodotto eliminato con successo' });
  } catch (err) {
    console.error("Errore nella cancellazione del prodotto:", err);
    res.status(500).json({ err: 'Errore interno del server' });
  }

})


module.exports = router;