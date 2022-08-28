export default async function getAsset(req, res) {
    try {

        const query = req.query
        const { assetId } = query
        
        let data = await fetch(`https://algoindexer.algoexplorerapi.io/v2/assets/${assetId}`)
            .then(res => res.json())
        return res.json({
            message: data.asset.params
        })
    } catch (error) {
        return res.json({
            message: new Error(error)
        })
    }
}
