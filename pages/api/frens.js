const { connectToDatabase } = require('../../lib/mongodb')

async function updateFrens(req, res) {
    try {
        let { db } = await connectToDatabase();
        let fren = req.body;
        fren = JSON.parse(fren);
        await db.collection('frenSholders').updateOne({address: fren.address}, {$set:{name: fren.name}}, {upsert: true})
        return res.json({
            message: 'fren updated!'
        })
    } catch (error) {
        return res.json({
            message: new Error(error).message
        })
    }
}

async function getFrens(req, res) {
    try {
        let { db } = await connectToDatabase();

        let frens = await db
            .collection('frenSholders')
            .find({})
            .sort({ _id: -1 })
            .toArray()
        return res.json({
            message: JSON.parse(JSON.stringify(frens))
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
            return getFrens(req, res);
        }

        case 'POST': {
            return updateFrens(req, res);
        }
    }
}