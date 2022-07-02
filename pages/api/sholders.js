const { connectToDatabase } = require('../../lib/mongodb')

async function listSholders(req, res) {
    try {
        let { db } = await connectToDatabase();
        let sholder = req.body;
        sholder = JSON.parse(sholder);
        await db.collection('sholders').updateOne({address: sholder.address}, {$set:sholder}, {upsert: true})
        return res.json({
            message: 'sholder listed!'
        })
    } catch (error) {
        return res.json({
            message: new Error(error).message
        })
    }
}

async function getSholders(req, res) {
    try {
        let { db } = await connectToDatabase();

        let sholders = await db
            .collection('sholders')
            .find({})
            .sort({ _id: -1 })
            .toArray()
        return res.json({
            message: JSON.parse(JSON.stringify(sholders))
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
            return getSholders(req, res);
        }

        case 'POST': {
            return listSholders(req, res);
        }
    }
}