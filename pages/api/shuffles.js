const { connectToDatabase } = require('../../lib/mongodb')
var ObjectId = require('mongodb').ObjectId

async function updateShuffles(req, res) {
    try {
        let { db } = await connectToDatabase();
        let shuffle = req.body;
        shuffle = JSON.parse(shuffle);
        await db.collection('shuffles').updateOne({
            "_id": ObjectId(shuffle._id)},
            {$set:{registery: shuffle.registery,
                lifeCycle: shuffle.lifeCycle,
                assets: shuffle.assets}},
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

async function getShuffles(req, res) {
    try {
        let { db } = await connectToDatabase();
        let shuffles = await db
            .collection('shuffles')
            .find({})
            .sort({ date: 1 })
            .toArray()
        return res.json({
            message: JSON.parse(JSON.stringify(shuffles))
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
            return getShuffles(req, res);
        }

        case 'POST': {
            return updateShuffles(req, res);
        }
    }
}