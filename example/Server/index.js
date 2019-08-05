const express = require('express');
const controller = require('./bookController');
const setHeaders = require('./setHeaders');
const { validateAddBook, validateEditBook } = require('./booksValidator');
var cors = require('cors');

const app = express();
app.listen(5000);

app.use(cors());

app.use(express.json(), setHeaders);


app.get('/books', controller.getList);
app.post('/books', validateAddBook, controller.addBook);
app.put('/books/:id', validateEditBook, controller.editBook);
app.delete('/books/:id', controller.deleteBook);
