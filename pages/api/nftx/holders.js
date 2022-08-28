export default async function getHolders(req, res) {
    try {
        const query = req.query
        const { collectionId } = query
        let data = await fetch(`https://api.nftexplorer.app/v1/collections/holders?collectionId=${collectionId}`,{method: 'GET', headers: {authorization: process.env.NEXT_PUBLIC_NFTX_TOKEN}}).then(res => res.json())
        return res.json({
            message: data.holders
        })
    } catch (error) {
        return res.json({
            message: new Error(error)
        })
    }
}
