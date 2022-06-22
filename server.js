const app = require('./app');
require('dotenv').config();

const { PORT, DB_HOST } = process.env;
const mongoose = require('mongoose');

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT);
  })
  .then(() => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
