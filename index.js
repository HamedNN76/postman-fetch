import * as sampleJSON from './sample.postman_collection.json';
import PostmanFetch from './PostmanFetch';

const { fetch } = new PostmanFetch({
  json: sampleJSON
});

fetch('User');
