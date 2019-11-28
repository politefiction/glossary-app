const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const Admin = require('../models/admin-model')
const { secret } = require('../db')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = secret

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            Admin.findOne({ id: jwt_payload.sub }, (err, admin) => {
                if (err) { 
                    console.log(err)
                    return done(err, false) 
                }
                if (admin) { 
                    return done(null, admin) 
                } else {
                    return done(null, false)
                }
            })
        })
    )
}

/*
module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            Admin.findById(jwt_payload.id)
                .then(admin => {
                    if (admin) {
                        return done(null, admin)
                    }
                    return done(null, false)
                }).catch(err => console.log(err))
        })
    )
}
*/