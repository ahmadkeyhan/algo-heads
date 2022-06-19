const { connectToDatabase } = require('../../lib/mongodb')

async function listHeads(req, res) {
    try {
        let { db } = await connectToDatabase();
        let head = req.body;
        head = JSON.parse(head);
        await db.collection('heads').updateOne({assetId: head.assetId}, {$set:head}, {upsert: true})
        return res.json({
            message: 'head listed!'
        })
    } catch (error) {
        return res.json({
            message: new Error(error).message
        })
    }
}

export default listHeads