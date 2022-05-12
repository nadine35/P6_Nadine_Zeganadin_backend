//verifier les token
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  try {
    const token = req.headers.authorization.split(' ')[1];//enlève le bearer
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);//décodage token
    const userId = decodedToken.userId;//on en sort le userId
    
    req.auth = {userId};
    
    if (req.body.userId && req.body.userId !== userId) {//si le corps de la requête comporte un objet à vendre
      throw 'Invalid user ID';
    } else {//si tout va bien on passe la requête au prochain middleware
    
      next();
    }
  } catch {
    res.status(401).json({//pb d'authentification error 401
      error: new Error('Invalid request!')
    });
  }
};