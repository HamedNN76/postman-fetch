import axios from 'axios';
import { strings } from '../config';

export default class PostmanFetch {

  constructor(json, config) {
    this.json = json;
    this.variables = config.variables;
    this.debug = config.debug;
  }

  setVariables = newVariables => {
    this.variables = {
      ...this.variables,
      ...newVariables
    };
  };

  showDebugMessage = (mode, message) => {
    if (this.debug) {
      console[mode](`\n ==> ${message} <== \n`);
    }
  };

  findRequestFromKey = key => {
    const keys = key.split('.');
    const findRequest = (items, key) => items.find(item => item.name === key);
    let foundRequest;
    let startedPoint = this.json.item;
    for (let i = 0; i < keys.length; i++) {
      const foundItem = findRequest(startedPoint, keys[i]);
      if (foundItem) {
        if (foundItem.request) {
          foundRequest = foundItem.request;
          break;
        } else {
          startedPoint = foundItem.item;
        }
      } else {
        break;
      }
    }

    if (foundRequest) {
      return foundRequest;
    } else {
      this.showDebugMessage('debug', strings.noRequestFound);
    }
  };

  replaceVariablesInString = value => {
    const regex = /\{{(.*)\}}/;
    if (regex.test(value)) {
      let property = value.match(regex).pop();
      const variable = this.variables[property];
      return value.replace(regex, variable)
    }
    return value;
  };

  generateObjects = (items = [], itemName) => {
    const generatedItems = {};
    items.forEach(item => {
      generatedItems[item.key] = this.replaceVariablesInString(item.value);
    });
    this.showDebugMessage('log', strings.generatedItems(generatedItems, itemName));
    return generatedItems;
  };

  validateParams = (requestParams = [], fetchParams = {}, validate) => {
    if (validate) {
      let collectionParams = requestParams;
      if (requestParams[requestParams.mode]) {
        collectionParams = JSON.parse(requestParams[requestParams.mode]);
      }
      const collectionOverParams = Object.keys(collectionParams).map(collectionKey =>
        fetchParams.hasOwnProperty(collectionKey)
      );
      const paramOverCollection = Object.keys(fetchParams).map(collectionKey =>
        collectionParams.hasOwnProperty(collectionKey)
      );
      const isParamsValid = ![...collectionOverParams, ...paramOverCollection].includes(false);
      if (!isParamsValid) {
        this.showDebugMessage('warn', strings.invalidBodyParams(fetchParams, collectionParams));
      }
      return isParamsValid;
    }
    return true;
  };

  fetch = (key, { body = {}, validateQueryParams = false, validateBodyParams = false, queryParams = {}, ...restConfig }) => {
    const foundRequest = this.findRequestFromKey(key);
    if (foundRequest) {
      this.showDebugMessage('log', `${JSON.stringify(foundRequest)} ${strings.foundRequest}`);
      const headers = this.generateObjects(foundRequest.header, 'headers');
      const isBodyParamsValid = this.validateParams(foundRequest.body, body, validateBodyParams);
      const isQueryParamsValid = this.validateParams(
        this.generateObjects(foundRequest.url.query, 'queryParams'),
        queryParams,
        validateQueryParams
      );
      console.log(isBodyParamsValid, 'body');
      console.log(isQueryParamsValid, 'query');
      const url = this.urlGenerator(foundRequest);
    }
  };

  urlGenerator = request => {
    const host = this.replaceVariablesInString(request.url.host[0]);
    const path = request.url.path.join('/');
    return `${host}/${path}`;
  }

};
