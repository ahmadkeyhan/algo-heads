const { connectToDatabase } = require('../../lib/mongodb')

export default async function getTasks(req, res) {
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
