const { connectToDatabase } = require('../../lib/mongodb')

async function registerEntry(req, res) {
    try {
        let { db } = await connectToDatabase();
        let participant = req.body;
        participant = JSON.parse(participant);
        await db.collection('participants').updateOne({sholder: participant.sholder}, {$set:participant}, {upsert: true})
        return res.json({
            message: 'participant registered!'
        })
    } catch (error) {
        return res.json({
            message: new Error(error).message
        })
    }
}

async function getEntries(req, res) {
    try {
        let { db } = await connectToDatabase();

        let entries = await db
            .collection('participants')
            .find({})
            .sort({ _id: -1 })
            .toArray()
        return res.json({
            message: JSON.parse(JSON.stringify(entries))
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
            return getEntries(req, res);
        }

        case 'POST': {
            return registerEntry(req, res);
        }
    }
}