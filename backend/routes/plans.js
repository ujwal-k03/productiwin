const express = require('express');
const { putPlan, getPlan, getMonth } = require('../controllers/plansController');

const router = express.Router();

// get a plan
router.get('/:planDate', getPlan);

// put a plan to the list
router.put('/', putPlan);

// get plans
router.post('/plans', getMonth);

module.exports = router;