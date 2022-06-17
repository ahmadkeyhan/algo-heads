export default async function getSales(req, res) {
    try {
        
        let sales = await fetch('https://api.nftexplorer.app/v1/collections/salesHistory/?collectionId=algo-heads',{method: 'GET', headers: {authorization: process.env.NEXT_PUBLIC_NFTX_TOKEN}}).then(res => res.json())
        return res.json({
            message: sales
        })
    } catch (error) {
        return res.json({
            message: new Error(error)
        })
    }
}
