const express = require('express');
const { putPlan, getPlan } = require('../controllers/plansController');

const router = express.Router();

// get a plan
router.get('/:planDate', getPlan);

// put a plan to the list
router.put('/', putPlan);

module.exports = router;