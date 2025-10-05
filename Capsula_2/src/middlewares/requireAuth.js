const jwt = require('jsonwebtoken');

module.exports = function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const [scheme, token] = auth.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Token faltante o malformado (usa Bearer <token>)' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Puedes adjuntar más info si la incluyes al firmar
    req.user = { id: payload.sub, username: payload.username };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};