module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Animals", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      datasetKey: { type: Sequelize.STRING },
      kingdom: { type: Sequelize.STRING },
      phylum: { type: Sequelize.STRING },
      class: { type: Sequelize.STRING },
      order: { type: Sequelize.STRING },
      family: { type: Sequelize.STRING },
      genus: { type: Sequelize.STRING },
      species: { type: Sequelize.STRING },
      taxonRank: { type: Sequelize.STRING },
      scientificName: { type: Sequelize.STRING },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Animals");
  },
};
