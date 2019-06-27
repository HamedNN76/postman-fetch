const staticList = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    type: 1
  },
  {
    id: 2,
    firstName: 'Johnathan',
    lastName: 'Doe',
    type: 1
  },
  {
    id: 3,
    firstName: 'postman',
    lastName: 'fetch',
    type: 2
  },
  {
    id: 4,
    firstName: 'the',
    lastName: 'postman',
    type: 2
  },
  {
    id: 5,
    firstName: 'java',
    lastName: 'script',
    type: 2
  },
  {
    id: 6,
    firstName: 'sample',
    lastName: 'sample',
    type: 2
  }
];

function handleGetWithQueryRequest(req, res) {
  if (req.query.type) {
    const filteredList = staticList.filter(item => {
      if (Number(req.query.type) === item.type) {
        return item;
      }
    });
    res.send(filteredList);
  } else {
    res.send(staticList);
  }
}

module.exports = {
  handleGetWithQueryRequest
};
