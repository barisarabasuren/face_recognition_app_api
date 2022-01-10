exports.handleSignin = (req, res, db, bcrypt) => {
    const {email, password} = req.body
    if(!email || !password) {
        res.status(400).json('incorrect form submission')
    } else {
        db.select('email', 'hash').from('login').where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash)
            if(isValid) {
                return db.select('*').from('users').where('email', '=', email)
                .then(user => res.json(user))
                .catch(err => res.status(400).json('enable to signin'))
            } else {
                res.status(400).json('wrong credentials')
            }
        })
        .catch(err => res.status(400).json('enable to signin'))
    }
}