export default async function getNfd(req, res) {
    try {
        let data = await fetch('https://algoindexer.algoexplorerapi.io/v2/accounts/IO47UAZLWHIQFV6FJNCIQH6CRATN2ENHCTKM3Z7VRMSHO2HUEPPNMQVH7A').then(res => res.json())
        data = data.account.assets.filter((asset) => asset["asset-id"] === 360019122)
        return res.json({
            message: data[0].amount
        })
    } catch (error) {
        return res.json({
            message: new Error(error)
        })
    }
}
