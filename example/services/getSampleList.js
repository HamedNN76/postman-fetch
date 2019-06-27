function generateListItems() {
  let items = [];
  for (let i = 0; i < 5; i++) {
    items.push({
      id: i + 1,
      name: `List item ${i + 1}`
    })
  }
  return items;
}

function handleGetSampleListRequest(req, res) {
  res.send(generateListItems());
}

module.exports = {
  handleGetSampleListRequest
};
