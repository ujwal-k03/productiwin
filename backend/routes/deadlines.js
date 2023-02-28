const express = require('express');
const { addDeadline, updateDeadline, showDeadlines, deleteDeadline } = require('../controllers/deadlinesController');

const router = express.Router();

// get all deadlines
router.get('/', showDeadlines);

// add a deadline to the list
router.post('/', addDeadline);

// update a deadline
router.patch('/:did', updateDeadline );

// delete a deadline
router.delete('/:did', deleteDeadline); 

module.exports = router;