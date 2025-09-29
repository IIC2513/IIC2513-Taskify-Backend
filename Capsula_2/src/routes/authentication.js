// Capsula_2/src/routes/authentication.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

module.exports = (orm) => {
  const { User } = orm;

  const signToken = (user) => {
    const payload = { sub: user.id, username: user.username };
    const opts = { expiresIn: process.env.JWT_EXPIRES_IN || '1h' };
    return jwt.sign(payload, process.env.JWT_SECRET, opts);
  };

  // POST /api/auth/register
  router.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: 'username y password son obligatorios' });
      }

      const existing = await User.findOne({ where: { username } });
      if (existing) {
        return res.status(400).json({ error: 'Username ya existe' });
      }

      // Hashear contraseña
      const passwordHash = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        password: passwordHash,   // Guarda el hash
        level: 1,
        experience: 0,
      });

      const token = signToken(user);

      return res.status(201).json({
        message: 'User created successfully',
        token,
        user: {
          id: user.id,
          username: user.username,
          level: user.level,
          experience: user.experience,
        },
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  // POST /api/auth/login
  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: 'username y password son obligatorios' });
      }

      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Comparar hash
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = signToken(user);

      return res.status(200).json({
        message: 'Login OK',
        token,
        user: {
          id: user.id,
          username: user.username,
          level: user.level,
          experience: user.experience,
        },
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  return router;
};
