const deadlinesModel = require('../models/deadlinesModel').deadlinesModel;
const deadlineModel = require('../models/deadlinesModel').deadlineModel;

// get the deadlines
const showDeadlines = async (req, res) => {

    // TODO: REPLACE THIS ONCE AUTH IS COMPLETE
    const deadlines_id = res.userid;

    try {
        const { deadlines } = await deadlinesModel.findById(deadlines_id, {_id: 0, deadlines: 1});
        res.status(200).json({deadlines, userid: res.userid});
        
    } catch (error) {
        res.status(400).json({ error: error.message, userid: res.userid});
    }

}


// add a deadline
const addDeadline = async (req, res) => {
    const { title, date, description } = req.body;
    
    // TODO: REPLACE THIS ONCE AUTH IS COMPLETE
    const deadlines_id = res.userid; 

    try {
        const deadline = deadlineModel({title, date, description});
        error = deadline.validateSync();
        if(error) throw error
        const status = await deadlinesModel.updateOne(
            { _id: deadlines_id },
            {
                $push: {
                    deadlines: deadline
                }
            }, { upsert: true }
        ).exec();

        res.status(200).json({deadline, userid: res.userid});
        
    } catch (error) {
        res.status(400).json({ error: error.message, userid: res.userid });
    }
}


// update a deadline
const updateDeadline = async (req, res) => {
    const { title, date, _id } = req.body;

    // TODO: REPLACE THIS ONCE AUTH IS COMPLETE
    const deadlines_id = res.userid; 

    const deadline_id = _id;

    try {
        // Remove the old deadline
        let status = await deadlinesModel.updateOne(
            { _id: deadlines_id, },
            {
                $pull: {
                    deadlines: {
                        _id: deadline_id
                    }
                }
            }
        ).exec();
        
        // Create a new deadline
        const deadline = deadlineModel({title, date});
        
        // Add the new deadline
        status = await deadlinesModel.updateOne(
            { _id: deadlines_id, },
            {
                $push: {
                    deadlines: deadline
                }
            }
        ).exec();
        
        // Send the response
        res.status(200).json({deadline, userid: res.userid});
        
    } catch (error) {
        res.status(400).json({ error: error.message, userid: res.userid });
    }
}


// delete a deadline
const deleteDeadline = async (req, res) => {
    const deadlines_id = res.userid; 

    const deadline_id = req.params.did;

    try {
        // Remove the old deadline
        let status = await deadlinesModel.updateOne(
            { _id: deadlines_id, },
            {
                $pull: {
                    deadlines: {
                        _id: deadline_id
                    }
                }
            }
        ).exec();

        res.status(200).json({ msg: "Deleted succesfully", userid: res.userid});

    } catch (error) {
        res.status(400).json({ error: error.message, userid: res.userid});
    }
}

module.exports = {
    addDeadline,
    updateDeadline,
    showDeadlines,
    deleteDeadline
}