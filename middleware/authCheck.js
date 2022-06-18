const authCheck = (req, res, next) => {
    if (!req.session.user) {
        next()
    } else {
        res.sendStatus(401)
    }
}

module.exports =  authCheck 