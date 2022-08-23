const { connectToDatabase } = require('../../lib/mongodb')
var ObjectId = require('mongodb').ObjectId

async function updateGiveAway(req, res) {
    try {
        let { db } = await connectToDatabase();
        let giveAway = req.body;
        giveAway = JSON.parse(giveAway);
        await db.collection('giveAways').updateOne(
            {_id: ObjectId(giveAway._id)},
            {$set:{registerants: giveAway.registerants,
                winner: giveAway.winner}},
            {upsert: true})
        return res.json({
            message: 'Shuffle updated!'
        })
    } catch (error) {
        return res.json({
            message: new Error(error).message
        })
    }
}

async function getGiveAways(req, res) {
    try {
        let { db } = await connectToDatabase();
        let giveAways = await db
            .collection('giveAways')
            .find({})
            .sort({ date: 1 })
            .toArray()
        return res.json({
            message: JSON.parse(JSON.stringify(giveAways))
        })
    } catch (error) {
        return res.json({
            message: new Error(error).message
        })
    }
}

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET': {
            return getGiveAways(req, res);
        }

        case 'POST': {
            return updateGiveAway(req, res);
        }
    }
}