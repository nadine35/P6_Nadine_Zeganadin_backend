//superpositions entre entrées et différentes routes
const multer = require('multer');
// images enregistrées arrivant depuis le frontend dans notre dossier image
// Tableau des extensions autorisées
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
// enregistrement sur le disque
const storage = multer.diskStorage({
    // Définition de la destination des fichiers images
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    // Création du nom du fichier de l'image
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_').split('.')[0];
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});







module.exports = multer({ storage: storage }).single('image');