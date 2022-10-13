const verifyID = {}

verifyID.ckeckID = async (req, res, next) => {
    try {
        if (req.query.id.length != 24) {
            return res.json({ 
                ok: false,
                msg: 'The ID (user, category, product) you are trying to get is invalid, check it'
            })
        } 
        next()
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


module.exports = verifyID