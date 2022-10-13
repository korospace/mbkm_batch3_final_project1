const express = require("express");
const router = express.Router();

const ReflectionsController = require("../controllers/reflections");

// Get All Reflections
router.get('/reflection', ReflectionsController.getReflections);

module.exports = router;