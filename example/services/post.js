function validateBodyParams(bodyParams) {
  console.log(bodyParams, 'body parms');
  let response = {
    message: 'This request needs name property to work!'
  };
  if (!bodyParams) {
    return response;
  } else {
    if (bodyParams.name) {
      response.message = 'this request is working now ;)';
    }
    return response;
  }
}

function handlePostRequest(req, res) {
  res.send(validateBodyParams(req.body));
}

module.exports = {
  handlePostRequest
};
