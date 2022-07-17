export default async function getAsset(req, res) {
    try {
        const query = req.query
        const { assetId } = query
        let asset = await fetch(`https://api.nftexplorer.app/v1/assets/info?assetId=${assetId}&includeNoteJson=true`,{method: 'GET', headers: {authorization: process.env.NEXT_PUBLIC_NFTX_TOKEN}}).then(res => res.json())
        return res.json({
            message: asset.asset
        })
    } catch (error) {
        return res.json({
            message: new Error(error)
        })
    }
}
