const express = require('express');
const app = express();

module.exports = function (client) {
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/api', (require('./routes')(client)));
  
  app.listen(3000);
}