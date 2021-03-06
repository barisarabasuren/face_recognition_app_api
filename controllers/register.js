exports.handleRegister = (req, res, db, bcrypt) => {
    const { email, password, name} = req.body
    if(!email || !password || !name) {
        res.status(400).json('incorrect form submission')
    } else {
        const hash = bcrypt.hashSync(password)
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                })
                .then(user => res.json(user))
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err => res.status(400).json('unable to register'))
    }
}