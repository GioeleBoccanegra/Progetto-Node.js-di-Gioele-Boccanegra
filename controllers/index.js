// controllers/index.js
const getUtenti = require('./utenti/getUtenti');
const createUtente = require('./utenti/createUtente');
const updateUtente = require('./utenti/updateUtente');
const deleteUtente = require('./utenti/deleteUtente');
const createProdotti = require("./prodotti/createProdotto");
const updateProdotti = require("./prodotti/updateProdotto");
const deleteProdotti = require("./prodotti/deleteProdotto");
const getOrdini = require("./ordiniSwap/getOrdini")
const createOrdini = require("./ordiniSwap/createOrdine")
const updateOrdini = require("./ordiniSwap/updateOrdine")
const deleteOrdini = require("./ordiniSwap/deleteOrdine")




module.exports = {
  getUtenti,
  createUtente,
  updateUtente,
  deleteUtente,
  createProdotti,
  updateProdotti,
  deleteProdotti,
  getOrdini,
  createOrdini,
  updateOrdini,
  deleteOrdini
};
