//verifier les token
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  try {
    const token = req.headers.authorization.split(' ')[1];
    //le jwt est passé dans le header authorization avec comme valeur bearer et après le token, split sur l'espace
    //et on récupère l'index 1 vu que l'index 0 est bearer
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);//décodage token remplacement du RANDOM_TOKEN_SECRET
    const userId = decodedToken.userId;//on en sort le userId
    
    req.auth = {userId};
    
    if (req.body.userId && req.body.userId !== userId) {//si le corps de la requête comporte un objet à liker
      throw 'Invalid user ID';//on échappe ce user
    } else {//si tout va bien on passe la requête au prochain middleware
    
      next();
    }
  } catch {
    res.status(401).json({//pb d'authentification error 401
      error: new Error('Invalid request!')
    });
  }
};