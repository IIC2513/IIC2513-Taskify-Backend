//Se crea el archivo de rutas
const express = require('express');
const router = express.Router();

module.exports = (orm) => {
  const { User } = orm;

  // Register endpoint - SIN hashing (solo para cápsula 4)
  router.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Check if user already exists
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      // Create user with password en texto plano (temporal para cápsula 4)
      const user = await User.create({
        username,
        password: password,
        level: 1,
        experience: 0
      });

      res.status(201).json({
        message: 'User created successfully',
        user: {
          id: user.id,
          username: user.username,
          level: user.level,
          experience: user.experience
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Login endpoint - solo comparación texto plano
  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Find user
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check password - Comparación en texto plano (solo cápsula 4)
      const validPassword = password === user.password;
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Hardcode JWT response (se implementará en cápsula 6)
      res.status(200).json({  
        message: 'Login successful',
        token: 'hardcoded-jwt-token-for-now',
        user: {
          id: user.id,
          username: user.username,
          level: user.level,
          experience: user.experience
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};