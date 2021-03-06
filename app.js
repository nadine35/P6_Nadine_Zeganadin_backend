// app.js gère ttes les requêtes envoyées à notre server permet de faire fonctionner l'appli
const express = require('express');
// const bodyParser=require('body-parser');
require('dotenv').config();//config du fichier .env


const mongoose = require('mongoose');//bdd mongo
const path = require('path');//donne acces au chemin du système de fichier
const sauceRoutes = require('./routes/sauce');//accès chemin de la route sauce
const userRoutes = require('./routes/user');//accès chemin de la route user
const Sauce = require('./models/Sauce');//accès chemin du model sauce



mongoose.connect(`mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASS}@${process.env.DB_HOST}`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  const app = express();


//intercepte toutes les requêtes qui ont un content-type json
// et met le contenu sur l'objet requête dans req.body
app.use(express.json());

//Pour empêcher les erreurs de CORS :
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Cross-Orifin-Ressource-Policy', 'cross-origin');
  next();
});



// app.use('/api/stuff', stuffRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
