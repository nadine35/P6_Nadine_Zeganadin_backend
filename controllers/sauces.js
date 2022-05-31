// in controllers/sauce.js
const Sauce = require('../models/Sauce');
const fs = require('fs');//file system donne accès aux fichiers
const { json } = require('express/lib/response');


//ajouter une sauce : POST
exports.createSauce = (req, res, next) => {
  //extraire l'objet json de sauce
const sauceObject = JSON.parse(req.body.sauce);//Stocker dans une constante infos sauce envoyées 
//par le frontend & transformées en objet js
delete sauceObject._id;//pour être sûr qu'il n'y a pas d'id générée par le frontend
 console.log(sauceObject)
  

const sauce = new Sauce({
    ...sauceObject,
    //recup segment url où se trouve notre sauce
    // raccourci copie champs dans le corps de la requête(nom, description, etc)
    
    //host racine du server ici localhost 3000, protocol http
    imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    

  });
  sauce.save()
  .then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      // console.log('pb lors de la création') console.log()
      res.status(400).json({
        error: error, message : 'pb lors de la création'
      });
    }
  );
};

exports.getOneSauce = (req, res, next) => {
  console.log('bonjour');
  Sauce.findOne({//retourne une seule sauce basée sur la fonction
    // de comparaison qu'on lui passe ( pour récupérer une sauce par son identifiant unique).
    _id: req.params.id
  }).then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};


exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?// Si req file existe (nouvelle image)
  { 
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })//remplace la nouvelle sauce
    .then(() => res.status(202).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};


        exports.deleteSauce = (req, res, next) => {
          Sauce.findOne({ _id: req.params.id })//recherche de l'id de la sauce
            .then(sauce => {
              const filename = sauce.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {//quel fichier est à supprimer
                Sauce.deleteOne({ _id: req.params.id })// faire appel au callback pour supprimer la sauce
                  .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
                  .catch(error => res.status(400).json({ error }));
              });
            })
            .catch(error => res.status(500).json({ error }));
        };

exports.getAllSauces = (req, res, next) => {
  console.log("bonjour baba");
  Sauce.find()
      .then(sauces =>{
//         const mappedSauce =sauces.map((sauces)=>{
//           sauces.imageUrl = req.protocol +'://'+ req.get('host')+'/images/'+sauces.imageUrl;
//           return sauces;
//         })
//        res.status(200).json(mappedSauce)
res.status(200).json(sauces)
}
).catch(error => res.status(500).json({ error: 'sauce non trouvée' }))
}



exports.likeUser = (req, res, next) => {
  console.log(req.params.id);
  if (req.body.like === 1) {//si le like est 1
      Sauce.updateOne({ _id: req.params.id },//on met à jour status sauce
          { 
              $inc: { likes: 1 },                           // $inc permet d'incrémenter le tab
              $push: { usersLiked: req.body.userId }  
                    // $push permet d'ajouter l'id de l'utilisateur dans le tableau usersLiked
          }
    
      )
      .then(() => res.status(202).json({ message: 'Like ajouté !' }))
      .catch(error => res.status(400).json({ error }))
  } else if (req.body.like === -1) {//sinon si : l'utilisateur peut liker ou disliker mais pas les 2
      Sauce.updateOne({ _id: req.params.id },
          { 
              $inc: { dislikes: 1},
              $push: { usersDisliked: req.body.userId } 
          }
      )
      .then(() => res.status(202).json({ message: 'Dislike ajouté !' }))
      .catch(error => res.status(400).json({ error }))
  } else {//sinon : 
      Sauce.findOne({ _id: req.params.id })//recup un seul objet par son id
          .then(sauces => {
              if (sauces.usersLiked.includes(req.body.userId)) {//si le tab contient l'id de l'user dans le tab
                  Sauce.updateOne({ _id: req.params.id },
                      {
                          $inc: { likes: -1 } ,
                          $pull: { usersLiked: req.body.userId }    // $pull permet de supprimer l'id de l'utilisateur dans le tableau usersliked
                      }
                  )
                  .then(() => { res.status(202).json({ message: 'Like supprimé !' }) })
                  .catch(error => res.status(400).json({ error }))
              } else if (sauces.usersDisliked.includes(req.body.userId)) {
                  Sauce.updateOne({ _id: req.params.id },
                      { 
                          $inc: { dislikes: -1 }, 
                          $pull: { usersDisliked: req.body.userId }
                      }
                  )
                  .then(() => { res.status(202).json({ message: 'Dislike supprimé !' }) })
                  .catch(error => res.status(400).json({ error }))
              }
          })
          .catch(error => res.status(400).json({ error }))
  }
} 



