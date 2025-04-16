const express = require('express')
const app = express()
app.use(express.json())
const prodottiRoutes = require('./routes/prodotti');

app.listen(3000, () => {
  console.log('server is running on port 3000')
})


app.use("/api/products", prodottiRoutes)