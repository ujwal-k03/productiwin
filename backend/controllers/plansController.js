const { PlanModel } = require("../models/planModel");

// get a date's plan
const getPlan = async (req, res) => {

    const planDate = req.params.planDate;

    try {
        const plan = await PlanModel.findOne({ date: planDate, userid: res.userid});
        res.status(200).json({plan, userid: res.userid});
    } catch (error) {
        res.status(400).json({error: error.message, userid: res.userid});
    }
}

// get month
const getMonth = async (req, res) => {

    const { beginDate, endDate }= req.body;
    const begin = new Date(beginDate);
    const end = new Date(endDate);

    try {
        const plans = await PlanModel.find(
            { 
                date: {
                    $gte: begin,
                    $lt: end 
                },
                userid: res.userid,
            },
            {
                _id: 0,
                name: 1,
                tasks: 1,
                date: 1,
            },
        );
        res.status(200).json({plans, userid: res.userid});
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
                date: date,
                userid: res.userid,
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
        console.log(error)
        res.status(400).json({error: error.message, userid: res.userid});
    }
}

module.exports = {
    putPlan,
    getPlan,
    getMonth
}