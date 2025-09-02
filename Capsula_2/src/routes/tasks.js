// Se crean las rutas
const express = require('express');
const router = express.Router();

module.exports = (orm) => {
  const { Task, User } = orm;

  // Obtiene todas las tareas del usuario
  router.get('/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const tasks = await Task.findAll({
        where: { userId, status: ['ACTIVE', 'COMPLETED'] },
        order: [['createdAt', 'DESC']]
      });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Crea una nueva tarea
  router.post('/', async (req, res) => {
    try {
      const { title, description, userId } = req.body;
      
      const task = await Task.create({
        title,
        description,
        userId,
        status: 'ACTIVE'
      });

      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Actualiza una tare (editar o marcar como completada)
  router.patch('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, status, userId } = req.body;
      
      const task = await Task.findOne({ where: { id, userId } });
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      // Actualza los campos
      if (title !== undefined) task.title = title;
      if (description !== undefined) task.description = description;
      if (status !== undefined) task.status = status;

      await task.save();

      // Si se marco completa, añade la experiencia
      if (status === 'COMPLETED' && task.status !== 'COMPLETED') {
        await addExperience(userId, 10); // 10 XP por tarea completada
      }

      res.json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // ELimmina una tarea
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      
      const task = await Task.findOne({ where: { id, userId } });
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      await task.destroy();
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Función para agregar experiencia y subir de nivel
  async function addExperience(userId, xp) {
    const user = await User.findByPk(userId);
    if (!user) return;

    const newExperience = user.experience + xp;
    const xpForNextLevel = user.level * 100; // Fórmula: nivel actual * 100 XP
    
    if (newExperience >= xpForNextLevel) {
      // Subir de nivel
      user.level += 1;
      user.experience = newExperience - xpForNextLevel;
    } else {
      user.experience = newExperience;
    }

    await user.save();
  }

  return router;
};