const http = require('http');
const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');
const { sequelize } = require('../models');

const PORT = process.env.PORT || 8000;
console.log(PORT);

const server = http.createServer(app);


async function startServer() {
  await loadPlanetsData();
  sequelize.sync()
    .then(() => {
      server.listen(PORT, () => {
        console.log('server is running');
      });
    })
    .catch(err => {
      console.error(err);
    })
}

startServer();