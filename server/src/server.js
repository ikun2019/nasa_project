const http = require('http');
const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;
console.log(PORT);

const server = http.createServer(app);


async function startServer() {
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log('server is running');
  });
}

startServer();