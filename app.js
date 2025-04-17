const express = require('express')
const app = express()
app.use(express.json())
const prodottiRoutes = require('./routes/prodotti');
const utentiRoutes = require('./routes/utenti');
const ordiniRoutes = require('./routes/ordini_swap')


app.listen(3000, () => {
  console.log('server is running on port 3000')
})


app.use("/api/products", prodottiRoutes)
app.use("/api/utenti", utentiRoutes)
app.use("/api/ordini", ordiniRoutes)