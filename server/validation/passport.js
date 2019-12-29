const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const User = require('../models/user-model')
const { secret } = require('../db')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: secret
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findOne({ id: jwt_payload.sub }, (err, user) => {
                if (err) { 
                    return done(err, false) 
                }
                if (user) { 
                    return done(null, user) 
                } else {
                    return done(null, false)
                }
            })
        })
    )
}