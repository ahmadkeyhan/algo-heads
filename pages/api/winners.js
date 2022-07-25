const { connectToDatabase } = require('../../lib/mongodb')

async function listWinners(req, res) {
    try {
        let { db } = await connectToDatabase();
        let winner = req.body;
        winner = JSON.parse(winner);
        await db.collection('winners').updateOne({asset: winner.asset}, {$set:winner}, {upsert: true})
        return res.json({
            message: 'winner listed!'
        })
    } catch (error) {
        return res.json({
            message: new Error(error).message
        })
    }
}

async function getWinners(req, res) {
    try {
        let { db } = await connectToDatabase();

        let winners = await db
            .collection('winners')
            .find({})
            .sort({ _id: -1 })
            .toArray()
        return res.json({
            message: JSON.parse(JSON.stringify(winners))
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
            return getWinners(req, res);
        }

        case 'POST': {
            return listWinners(req, res);
        }
    }
}