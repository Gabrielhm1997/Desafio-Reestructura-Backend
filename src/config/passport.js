import local from 'passport-local'
import passport from 'passport'
import userModel from '../models/users.models.js'
import { createHash, validatePassword } from '../utils/bcrypt.js'

const LocalStrategy = local.Strategy

const initializePassport = () => {

    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {

        const { first_name, last_name, email, age } = req.body
        try {
            const user = await userModel.findOne({ email: email })

            if (user) {
                return done(null, false)
            } else {
                const passwordHash = createHash(password)
                const newUser = await userModel.create({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    age: age,
                    password: passwordHash
                })
                return done(null, newUser)
            }
        } catch (error) {
            return done(error, false)
        }
    }))

    passport.use('login', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {

        try {
            const user = await userModel.findOne({ email: username })

            if (!user) {
                return done(null, false)
            } else if (validatePassword(password, user.password)) {
                return done(null, user) //Usuario y contraseña validos
            } else {
                return done(null, false) //Contraseña no valida
            }
        } catch (error) {
            console.log(error)
            return done(error, false)
        }
    }))

    // passport.use('github', new GithubStrategy({
    //     clientID: process.env.CLIENT_ID,
    //     clientSecret: process.env.CLIENT_SECRET,
    //     callbackURL: process.env.CALLBACK_URL

    // }, async (accessToken, refreshToken, profile, done) => {

    //     try {
    //         console.log(accessToken)
    //         console.log(refreshToken)
    //         console.log(process.env.CALLBACK_URL)
    //         const user = await userModel.findOne({ email: profile._json.email })
    //         if (!user) {
    //             const userCreated = await userModel.create({
    //                 first_name: profile._json.name,
    //                 last_name: ' ',
    //                 email: profile._json.email,
    //                 age: 18, //Edad por defecto,
    //                 password: 'password'
    //             })
    //             done(null, userCreated)

    //         } else {
    //             done(null, user)
    //         }

    //     } catch (error) {
    //         done(error)
    //     }

    // }))

    //Inicializar la session del user
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    //Eliminar la session del user
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })
}

export default initializePassport