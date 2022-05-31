const bcrypt = require('bcrypt');// hashage mdp
const jwt = require('jsonwebtoken');// access token (jeton d’accès) 
//qui permet un échange sécurisé de donnée entre deux parties.
const User= require('../models/User')// accès au chemin du model user


exports.signup = (req, res, next) => {
  console.log('bonjour')
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.login = (req, res, next) => {
    console.log('bonjour')
    console.log(req.body)
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          console.log('utilisateur non trouvé !')
          return res.status(401).json({ error: 'Utilisateur non trouvé nadine!' });
        }
        console.log('utilisateur trouvé !')
        console.log(user)
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                  { userId: user._id},
                  process.env.RANDOM_TOKEN_SECRET,
                  { expiresIn: '24h'}
              )
            }
           
            );
         
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
  