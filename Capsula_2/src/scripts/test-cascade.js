// src/scripts/test-cascade.js
'use strict';

const { sequelize, User, Task } = require('../models');

(async () => {
  try {
    console.log('\n=== Estado inicial ===');
    const usersBefore = await User.findAll({ raw: true });
    const tasksBefore = await Task.findAll({ raw: true });
    console.table(usersBefore);
    console.table(tasksBefore.map(t => ({ id: t.id, title: t.title, userId: t.userId, status: t.status })));

    // --- 1) Borrar usuario "raul" y verificar cascada sobre "Comprar pan" ---
    const raul = await User.findOne({ where: { username: 'raul' } });
    if (!raul) {
      console.log('⚠️ Usuario "raul" no existe; no se prueba cascada para él.');
    } else {
      // Busca sus tareas antes de borrar
      const raulTasksBefore = await Task.findAll({ where: { userId: raul.id }, raw: true });
      console.log(`\nTareas de raul (id=${raul.id}) antes de borrar:`, raulTasksBefore.map(t => t.title));

      // Borrar usuario raul
      await User.destroy({ where: { id: raul.id } });
      console.log('✅ Usuario "raul" borrado.');

      // Verificar que sus tareas se borraron (cascada)
      const raulTasksAfter = await Task.findAll({ where: { userId: raul.id }, raw: true });
      const comprarPan = await Task.findOne({ where: { title: 'Comprar pan' } });

      if (raulTasksAfter.length === 0 && !comprarPan) {
        console.log('✅ Cascada OK: se borraron las tareas de "raul" (incluida "Comprar pan").');
      } else {
        console.error('❌ Cascada FALLÓ: aún existen tareas de "raul" o "Comprar pan".');
      }
    }

    // --- 2) Borrar tarea "Hacer ejercicio" y verificar que bernardo sigue existiendo ---
    const bernardo = await User.findOne({ where: { username: 'bernardo' }, raw: true });
    if (!bernardo) {
      console.log('⚠️ Usuario "bernardo" no existe; no se puede verificar su permanencia.');
    } else {
      const ejercicio = await Task.findOne({ where: { title: 'Hacer ejercicio', userId: bernardo.id } });
      if (!ejercicio) {
        console.log('⚠️ La tarea "Hacer ejercicio" no existe (posiblemente ya fue borrada).');
      } else {
        await Task.destroy({ where: { id: ejercicio.id } });
        console.log('✅ Tarea "Hacer ejercicio" borrada.');
      }

      // Comprobar que el usuario "bernardo" sigue
      const bernardoStill = await User.findOne({ where: { id: bernardo.id } });
      if (bernardoStill) {
        console.log('✅ Usuario "bernardo" permanece después de borrar la tarea (correcto).');
      } else {
        console.error('❌ ERROR: "bernardo" fue borrado al eliminar la tarea (no debería ocurrir).');
      }
    }

    // --- Estado final ---
    console.log('\n=== Estado final ===');
    const usersAfter = await User.findAll({ raw: true });
    const tasksAfter = await Task.findAll({ raw: true });
    console.table(usersAfter);
    console.table(tasksAfter.map(t => ({ id: t.id, title: t.title, userId: t.userId, status: t.status })));

  } catch (err) {
    console.error('❌ Error en el script:', err);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
})();
// Ejecutar con: node src/scripts/test-cascade.js