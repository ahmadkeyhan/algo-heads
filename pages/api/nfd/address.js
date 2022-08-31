export default async function getNfd(req, res) {
    try {
        const query = req.query
        const { address } = query
        let data = await fetch(`https://api.nf.domains/nfd/address?address=${address}`).then(res => res.json())
        return res.json({
            message: data
        })
    } catch (error) {
        return res.json({
            message: new Error(error)
        })
    }
}
