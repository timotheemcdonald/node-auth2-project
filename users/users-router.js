const router = require('express').Router()

const Users = require('./users-model')
const restricted = require('../auth/restricted-middleware')

router.get('/', restricted, checkRole('user'), (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => res.send(err))
})

function checkRole(role){
    return (req, res, next) => {
        if (req.jwt.role === role) {
            next()
        } else {
            res.status(403).json({ message: 'You are not authorized.'})
        }
    }
}

module.exports = router;