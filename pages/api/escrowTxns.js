export default async function getTxns(req, res) {
    try {
        const query = req.query
        const { wallet } = query
        let txns = await fetch(`https://algoindexer.algoexplorerapi.io/v2/accounts/${wallet}/transactions`)
            .then(res => res.json())
            txns = txns.transactions.filter((txn) => txn["tx-type"] == "pay" && txn["payment-transaction"].receiver == wallet && txn.sender != wallet)
        return res.json({
            message: txns
        })
    } catch (error) {
        return res.json({
            message: new Error(error)
        })
    }
}
