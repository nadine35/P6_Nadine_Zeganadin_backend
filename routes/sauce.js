const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth')
const sauceCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config')

//Création des différentes routes de l'API
router.post('/', auth, multer, sauceCtrl.createSauce);//on créé un nouvel objet : on a 1 fichier image inclus avec
//la requête
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);

// Route pour la gestion les "likes/dislikes"
router.post('/:id/like', auth, sauceCtrl.likeUser);


module.exports = router;