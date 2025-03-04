const express = require("express");
const { Animal } = require("../models");
const { authMiddleware } = require("../middleware/auth");
require("dotenv").config({ path: __dirname + "/../.env" });
const router = express.Router();
const redisClient = require("../config/redisclient");
const cacheMiddleware = require("../middleware/cacheMiddleare");



router.get("/", cacheMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    const animals = await Animal.findAndCountAll({ limit, offset });

    if (res.locals.cache) {
      await res.locals.cache(animals);
    }

    res.json(animals); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:id", cacheMiddleware, async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) return res.status(404).json({ error: "Not found" });

     redisClient.setEx(req.originalUrl, 3600, JSON.stringify(animal));

    res.json(animal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/", authMiddleware, async (req, res) => {
  try {
    const animal = await Animal.create(req.body);
    res.status(201).json(animal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) return res.status(404).json({ error: "Not found" });

    await animal.update(req.body);
    res.json(animal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) return res.status(404).json({ error: "Not found" });

    await animal.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;