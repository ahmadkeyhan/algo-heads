const { connectToDatabase } = require('../../lib/mongodb')

async function updateAuction(req, res) {
    try {
        let { db } = await connectToDatabase();
        let auction = req.body;
        auction = JSON.parse(auction);
        await db.collection('auctions').updateOne({escrowWallet: auction.escrowWallet}, {$set:{bidHistory: auction.bidHistory, lifeCycle: auction.lifeCycle}}, {upsert: true})
        return res.json({
            message: 'Auction updated!'
        })
    } catch (error) {
        return res.json({
            message: new Error(error).message
        })
    }
}

async function getAuctions(req, res) {
    try {
        let { db } = await connectToDatabase();

        let auctions = await db
            .collection('auctions')
            .find({})
            .sort({ _id: -1 })
            .toArray()
        return res.json({
            message: JSON.parse(JSON.stringify(auctions))
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
            return getAuctions(req, res);
        }

        case 'POST': {
            return updateAuction(req, res);
        }
    }
}