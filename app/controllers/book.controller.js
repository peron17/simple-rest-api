const BookModel = require('../models/book.model')

// store
exports.store = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            status: 400,
            message: 'Content can not be empty'
        })
    }

    const book = new BookModel({
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        year: req.body.year,
        price: req.body.price
    })

    book.save()
    .then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: 'Failed to store data. Error : ' + err.message
        })
    })
}

// retrieve all data
exports.all = (req, res) => {
    BookModel.find()
    .then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: 'Failed to retrieve data. Error : ' + err.message
        })
    })
}

// show
exports.show = (req, res) => {
    BookModel.findById(req.params.id)
    .then(data => {
        if(!data) {
            res.status(404).send({
                status: 404,
                message: 'Data not found with this id'
            })
        }
        res.send(data)
    }).catch(err => {
        if (err.kind == 'ObjectId') {
            return res.status(404).send({
                status: 404,
                message: 'Data not found with this id'
            })
        } 
        return res.status(500).send({
            status: 500,
            message: 'Error when retrieving'
        })
    })
}

// update
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            status: 400,
            message: 'Content can not be empty'
        })
    }

    BookModel.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        year: req.body.year,
        price: req.body.price
    }, {new: true})
    .then(data => {
        if(!data) {
            res.status(404).send({
                status: 404,
                message: 'Data not found with this id'
            })
        }
        res.send(data)
    }).catch(err => {
        if (err.kind == 'ObjectId') {
            return res.status(404).send({
                status: 404,
                message: 'Data not found with this id'
            })
        } 
        return res.status(500).send({
            status: 500,
            message: 'Error when retrieving'
        })
    })
}

// delete
exports.delete = (req, res) => {
    BookModel.findByIdAndRemove(req.params.id)
    .then(data => {
        if(!data) {
            res.status(404).send({
                status: 404,
                message: 'Data not found with this id'
            })
        }
        res.send({message: 'Deleted'})
    }).catch(err => {
        if (err.kind == 'ObjectId' || err.name == 'NotFound') {
            return res.status(404).send({
                status: 404,
                message: 'Data not found with this id'
            })
        }
        return res.status(500).send({
            status: 500,
            message: 'Failed to delete'
        })
    })
}
