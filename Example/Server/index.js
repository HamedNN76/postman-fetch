const express = require('express');
const controller = require('./bookController');
const setHeaders = require('./setHeaders');
const { validateAddBook, validateEditBook } = require('./booksValidator');

const app = express();
app.listen(3000);

app.use(express.json(), setHeaders);


app.get('/books', controller.getList);
app.post('/books', validateAddBook, controller.addBook);
app.put('/books/:id', validateEditBook, controller.editBook);
app.delete('/books/:id', controller.deleteBook);
