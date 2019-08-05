import PostmanFetch from 'postman-fetch';
import * as postmanCollection from './sample.postman_collection.json';

const options = {
  variables: {
    url: 'http://localhost:5000'
  },
  debug: true
};

const { fetch, setVariables } = new PostmanFetch(postmanCollection, options);

export {
  fetch,
  setVariables
};
