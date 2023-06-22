const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

const { Planet } = require('../../models');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
      .pipe(parse({
        comment: '#',
        columns: true,
      }))
      .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
          savePlanet(data);
        }
      })
      .on('error', (err) => {
        console.error(err);
        reject(err);
      })
      .on('end', async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${habitablePlanets.length}`);
        resolve();
      });
  });
}

async function getAllPlanets() {
  // return habitablePlanets;
  return await Planet.findAll();
}

async function savePlanet(planet) {
  try {
    // await Planet.update({
    //   keplerName: planet.kepler_name,
    // }, {
    //   keplerName: planet.kepler_name,
    // }, {
    //   upsert: true,
    // });
    const [updatedCount, created] = await Planet.update(
      { keplerName: planet.kepler_name }, // Updated values
      { where: { keplerName: planet.kepler_name }, returning: true } // Condition for update
    );

    if (created) {
      console.log('New planet created:', planet);
    } else {
      console.log('Planet updated:', updatedCount > 0 ? updatedCount[0] : 0, 'records updated');
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
}