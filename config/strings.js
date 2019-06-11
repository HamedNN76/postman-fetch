export default {
  noRequestFound: 'There is no request with the given key!!!',
  foundRequest: 'Found Request from given key',
  generatedHeaders: 'Generated headers',
  invalidBodyParams: (bodyParams, collectionParams) =>
    `Request needs ${JSON.stringify(collectionParams)} but you sent ${JSON.stringify(bodyParams)} 
if you are sure of what you sent set validate param to false`,
};
