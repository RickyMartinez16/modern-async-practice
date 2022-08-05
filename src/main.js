const axios = require("../utils/axios");
const BASE_URL = "http://localhost:5000";

function isValid({ id, name, meaning, quadrant, starsWithPlanets }) {
  return id && name && meaning && quadrant && starsWithPlanets;
}

async function update(constellation) {
  try {
    const url = `${BASE_URL}/constellations/${constellation.id}`;
    const result = await axios.put(url, constellation);
    return result;
  } catch(err){
    return `Updating constellation (id: ${id}) failed.`
  }
}

async function bulkImport(constellations) {
  try {
    if (!Array.isArray(constellations)) {
      return "Inputted argument must be an array."
    };
    if (constellations.every((constellation) => isValid(constellation))) {
      return Promise.allSettled(
        constellations.map((constellation) => update(constellation))
      );
    }
    else {
      return "All constellations must include relevant fields."
    }
  } 
  catch(error) {
    console.log(error)
  }
}

module.exports = { bulkImport, update };