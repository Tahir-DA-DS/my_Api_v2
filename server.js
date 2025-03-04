require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const { sequelize } = require("./models");
const authRoutes = require("./routes/auth");
const animalRoutes = require("./routes/animal");


const app = express();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());


app.use("/auth", authRoutes);
app.use("/animals", animalRoutes);


sequelize.sync().then(() => {
  console.log("Database connected");
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});