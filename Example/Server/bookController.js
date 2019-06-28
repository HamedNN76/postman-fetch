const books = require('./books');
const fs = require('fs');
const uuid = require('uuid/v1');


function getList(req, res) {
    res.status(200).send(books);
}


function addBook(req, res) {
    const books = JSON.parse(fs.readFileSync('./books.json'));
    const newList = JSON.stringify([
            ...books,
            {
                ...req.body,
                id: uuid()
            }
        ]
    );
    fs.writeFileSync('./books.json', newList);
    res.status(200).send(newList);
}

function editBook(req, res) {
    const books = JSON.parse(fs.readFileSync('./books.json'));
    const foundBook = books.find(book => book.id === req.params.id);
    if (!foundBook) {
        return res.status(404).send({ error: 'book not found' })
    }
    const newList = books.map(book => {
        if (book.id === req.params.id) {
            return {
                ...book,
                ...req.body
            };
        }
    });
    fs.writeFileSync('./books.json', JSON.stringify(newList));
    const foundNewBook = newList.find(book => book.id === req.params.id);
    res.status(200).send(JSON.stringify(foundNewBook));
}

function deleteBook(req, res) {
    const books = JSON.parse(fs.readFileSync('./books.json'));
    const newList = books.filter(book => book.id !== req.params.id);
    fs.writeFileSync('./books.json', JSON.stringify(newList));
    res.status(200).send({ success: true });
}

module.exports = {
    getList,
    addBook,
    editBook,
    deleteBook
};
