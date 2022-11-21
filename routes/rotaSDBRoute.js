const express = require('express');
const router = express.Router();

const RotaSDBController = require('../controllers/rotaSDBController')

router.get('/', RotaSDBController.getRotaSDB);

module.exports= router;