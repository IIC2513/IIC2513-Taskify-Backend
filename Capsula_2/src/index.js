const app = require('./app');
const orm = require('./models');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await orm.sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed', err);
    process.exit(1);
  }
})();
