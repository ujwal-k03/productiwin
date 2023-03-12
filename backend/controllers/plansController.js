const { PlanModel, TaskModel } = require("../models/planModel");

// get a date's plan
const getPlan = async (req, res) => {

    const planDate = req.params.planDate;

    try {
        const plan = await PlanModel.findOne({ date: planDate });
        res.status(200).json({plan, userid: res.userid});
    } catch (error) {
        res.status(400).json({error: error.message, userid: res.userid});
    }
}

// put a new plan
const putPlan = async (req, res) => {
    const {name, date, tasks} = req.body;

    try {
        const plan = PlanModel({name, date, tasks});
        const status = await PlanModel.updateOne(
            {
                date: date
            },
            {
                name: plan.name,
                date: plan.date,
                tasks: plan.tasks
            },
            {
                upsert: true
            }
        ).exec();

        res.status(200).json({plan, userid: res.userid});
    } catch (error) {
        res.status(400).json({error: error.message, userid: res.userid});
    }
    

}

module.exports = {
    putPlan,
    getPlan
}