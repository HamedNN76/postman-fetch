export default {
  noRequestFound: 'There is no request with the given key!!!',
  foundRequest: 'Found Request from given key',
  logRequestAndFetchParams: (collectionParams, fetchParams, name) => `
${name}
<CollectionParams>
${JSON.stringify(collectionParams)}
</CollectionParams>
<FetchParams>
${JSON.stringify(fetchParams)}
</FetchParams>
`,
  logRequestOptions: options => `Your generated request options from collection: ${JSON.stringify(options)}`
};
