const fs = require("fs");
const path = require("path");

module.exports = {
  up: async (queryInterface) => {
    const jsonData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data_corrected.json"), "utf8")
    );

    const formattedData = jsonData
      .filter((item) => item.scientificName && item.kingdom) 
      .map((item) => ({
        datasetKey: item.datasetKey || "Unknown",
        kingdom: item.kingdom || "Unknown",
        phylum: item.phylum || "Unknown",
        class: item.class || "Unknown",
        order: item.order || "Unknown",
        family: item.family || "Unknown",
        genus: item.genus || "Unknown",
        species: item.species || "Unknown",
        taxonRank: item.taxonRank || "Unknown",
        scientificName: item.scientificName || "Unknown",
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

    await queryInterface.bulkInsert("Animals", formattedData, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Animals", null, {});
  },
};