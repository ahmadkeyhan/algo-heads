export default async function getSholder(req, res) {
    try {

        const query = req.query
        const { id } = query
        
        let data = await fetch(`https://algoindexer.algoexplorerapi.io/v2/assets/${id}/balances?currency-greater-than=0`)
            .then(res => res.json())
        return res.json({
            message: data.balances[0].address
        })
    } catch (error) {
        return res.json({
            message: new Error(error)
        })
    }
}
