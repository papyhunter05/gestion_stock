const express = require('express');
const cors = require('cors');

const produitRoutes = require('./routes/produitRoutes');
const entreeRoutes = require('./routes/entreeRoutes');
const sortieRoutes = require('./routes/sortieRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/produits', produitRoutes);
app.use('/entrees', entreeRoutes);
app.use('/sorties', sortieRoutes);

app.listen(3000, () => {
    console.log("Serveur démarré sur port 3000");
});