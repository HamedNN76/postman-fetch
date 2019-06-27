const express = require('express');
const app = express();
const port = 3000;
const { handleGetSampleListRequest } = require('./services/getSampleList');
const { handlePostRequest } = require('./services/post');
const { handleGetWithQueryRequest } = require('./services/getWithQuery');

app.use(express.json());

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.get('/list', handleGetSampleListRequest);

app.post('/post', handlePostRequest);

app.get('/filteredList', handleGetWithQueryRequest);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
