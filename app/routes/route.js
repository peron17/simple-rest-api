module.exports = (app) => {
    const auth = require('../middlewares/auth')
    const user = require('../controllers/user.controller')
    const books = require('../controllers/book.controller')

    // User
    // =====================
    // register
    app.post('/user', user.store)
    
    // login
    app.post('/login', user.login)
    
    // profile
    app.get('/profile', auth, user.profile)
    
    // logout
    app.post('/logout', user.logout)
    
    // logout all
    app.post('/logout-all', user.logoutall)

    // Book
    // =====================
    // store
    app.post('/book', books.store)

    // retrieve all
    app.get('/book', books.all)

    // show by id
    app.get('/book/:id', books.show)

    // update
    app.put('/book/:id', books.update)

    // delete
    app.delete('/book/:id', books.delete)
}