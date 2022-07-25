const { connectToDatabase } = require('../../lib/mongodb')

async function listHeads(req, res) {
    try {
        let { db } = await connectToDatabase();
        let head = req.body;
        head = JSON.parse(head);
        await db.collection('heads').updateOne({assetId: head.assetId}, {$set:{price: head.price, sholder: head.sholder}}, {upsert: true})
        return res.json({
            message: 'head listed!'
        })
    } catch (error) {
        return res.json({
            message: new Error(error).message
        })
    }
}

async function getHeads(req, res) {
    try {
        let { db } = await connectToDatabase();

        let heads = await db
            .collection('heads')
            .find({})
            .sort({ _id: -1 })
            .toArray()
        return res.json({
            message: JSON.parse(JSON.stringify(heads))
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
            return getHeads(req, res);
        }

        case 'POST': {
            return listHeads(req, res);
        }
    }
}