const { connectToDatabase } = require('../../lib/mongodb')

export default async function getTasks(req, res) {
    try {
        let { db } = await connectToDatabase();
        let tasks = await db
            .collection('tasks')
            .find({})
            .sort({ _id: -1 })
            .toArray()
        return res.json({
            message: JSON.parse(JSON.stringify(tasks))
        })
    } catch (error) {
        return res.json({
            message: new Error(error).message
        })
    }
}
