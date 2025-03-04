module.exports = (sequelize, DataTypes) => {
  const Animal = sequelize.define("Animal", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    datasetKey: DataTypes.STRING,
    kingdom: DataTypes.STRING,
    phylum: DataTypes.STRING,
    class: DataTypes.STRING,
    order: DataTypes.STRING,
    family: DataTypes.STRING,
    genus: DataTypes.STRING,
    species: DataTypes.STRING,
    taxonRank: DataTypes.STRING,
    scientificName: DataTypes.STRING,
  });

  return Animal;
};