const app = require('./app');
require('dotenv').config();
// const PORT = 3000;
// const DB_HOST =
//   'mongodb+srv://MARIAIVANOVA:15061993lm@cluster0.nhvm059.mongodb.net/test';
const { PORT, DB_HOST } = process.env;
const mongoose = require('mongoose');

// main()
//   .then(() => {
//     console.log('Database connection successful');
//   })
//   .catch(err => console.log(err));

// async function main() {
//   await mongoose.connect(DB_HOST);
// }
// app.listen(PORT, () => {
//   console.log('Server running. Use our API on port: 3000');
// });
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
