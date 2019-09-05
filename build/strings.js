"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
  noRequestFound: 'There is no request with the given key!!!',
  foundRequest: 'Found Request from given key',
  logRequestAndFetchParams: function logRequestAndFetchParams(collectionParams, fetchParams, name) {
    return "\n".concat(name, "\n<CollectionParams>\n").concat(JSON.stringify(collectionParams), "\n</CollectionParams>\n<FetchParams>\n").concat(JSON.stringify(fetchParams), "\n</FetchParams>\n");
  },
  logRequestOptions: function logRequestOptions(options) {
    return "Your generated request options from collection: ".concat(JSON.stringify(options));
  }
};