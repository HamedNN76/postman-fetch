import axios from 'axios';
import strings from './strings';

export default class PostmanFetch {

  constructor(json, config = {}) {
    this.json = json.default;
    this.variables = config.variables || {};
    this.headers = config.headers || {};
    this.debug = config.debug || false;
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
      if (variable) {
        return value.replace(regex, variable);
      } else {
        return null;
      }
    }
    return value;
  };

  generateObjects = (items = []) => {
    const generatedItems = {};
    items.forEach(item => {
      if (!!item.value) {
        const value = this.replaceVariablesInString(item.value);
        if (value) {
          generatedItems[item.key] = value
        }
      }
    });
    return generatedItems;
  };

  fetch = (
    key,
    {
      data = {},
      params = {},
      ...restConfig
    } = {}
  ) => {
    const foundRequest = this.findRequestFromKey(key);
    if (foundRequest) {
      this.showDebugMessage('log', `${JSON.stringify(foundRequest)} ${strings.foundRequest}`);
      const collectionBodyParams = foundRequest.body && foundRequest.body[foundRequest.body.mode] || {};
      const collectionQueryParams = foundRequest.url.query || {};

      if (data) {
        this.showDebugMessage(
          'log',
          strings.logRequestAndFetchParams(collectionBodyParams, data, 'body params')
        );
      }
      if (params) {
        this.showDebugMessage(
          'log',
          strings.logRequestAndFetchParams(collectionQueryParams, params, 'query params')
        );
      }

      const headers = {
        ...this.generateObjects(foundRequest.header, 'headers'),
        ...this.headers
      };
      const url = this.urlGenerator(foundRequest);
      let options = {
        url,
        method: foundRequest.method,
        data,
        params,
        headers,
        ...restConfig
      };
      this.showDebugMessage('log', strings.logRequestOptions(options));

      if (options.type === 'formdata') {
        options.data = new FormData();

        for (let key in data) {
          if (typeof key === 'string' && data.hasOwnProperty(key) && typeof data[key] !== 'undefined') {
            options.data.append(key, data[key]);
          }
        }
      }

      return axios(options);
    }
  };

  urlGenerator = request => {
    const host = this.replaceVariablesInString(request.url.host[0]);
    const path = request.url.path.map(item => this.replaceVariablesInString(item)).join('/');
    return `${host}/${path}`;
  }

}

export {
  PostmanFetch
};
