const express = require('express');
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

const homeRoutes = require('../routes/home');

app.use('/', homeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});