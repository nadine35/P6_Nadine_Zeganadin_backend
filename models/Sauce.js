//creation de shéma de donnees qui contient les champs souhaités pour chaque thing
//indique leur type ainsi que leur caractère (obligatoire ou non). Pour cela, on utilise la méthode Schema mise à disposition par Mongoose. Pas besoin de mettre un champ
// pour l'Id puisqu'il est automatiquement généré par Mongoose ;
//ensuite, nous exportons ce schéma en tant que modèle Mongoose appelé « Thing », 
//le rendant par là même disponible pour notre application Express.
//Ce modèle vous permettra non seulement d'appliquer notre structure de données, mais aussi de simplifier 
//les opérations de lecture et d'écriture dans la base de données
//La méthode  Schema  de Mongoose vous permet de créer un schéma de données pour votre base de données MongoDB.

//La méthode  model  transforme ce modèle en un modèle utilisable.
const mongoose = require('mongoose');



const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true},
  manufacturer: { type: String, required: true},
  description: { type: String, required: true},
  mainPepper: { type: String, required: true},
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true},
  likes: { type: Number, required: true, default:0 },
  dislikes: { type: Number, required: true, default:0  },
  usersLiked: { type: Array, required: true, default:[]  },
  usersDisliked: { type: Array, required: true, default:[] }
});

module.exports = mongoose.model('Sauce', sauceSchema);
//exporter schéma sous forme de model
