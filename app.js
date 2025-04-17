const express = require('express')
const app = express()
app.use(express.json())
const multer = require('multer');
const db = require('./db');
const prodottiRoutes = require('./routes/prodotti');
const utentiRoutes = require('./routes/utenti');
const ordiniRoutes = require('./routes/ordini_swap')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Salva i file nella cartella 'uploads'
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nome univoco per ogni file
  }
});
const upload = multer({ storage: storage });

app.listen(3000, () => {
  console.log('server is running on port 3000')
})


app.use("/api/prodotti", prodottiRoutes)
app.use("/api/utenti", utentiRoutes)
app.use("/api/ordini", ordiniRoutes)