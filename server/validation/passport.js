const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const Admin = require('../models/admin-model')
const { secret } = require('../db')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: secret
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            Admin.findOne({ id: jwt_payload.sub }, (err, admin) => {
                if (err) { 
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