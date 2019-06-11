import axios from 'axios';
import { strings } from '../config';

export default class PostmanFetch {

  constructor(json, config) {
    this.json = json;
    this.variables = config.variables;
    this.debug = config.debug;
    this.validate = config.validate;
  }

  setVariables = newVariables => {
    this.variables = {
      ...this.variables,
      ...newVariables
    };
  };

  showDebugMessage = (mode, message) => {
    if (this.debug) {
      console[mode](message);
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

  generateHeaders = request => {
    const headers = request.header;
    const generatedHeaders = {};
    headers.forEach(header => {
      generatedHeaders[header.key] = this.replaceVariablesInString(header.value);
    });
    this.showDebugMessage('log', `${JSON.stringify(generatedHeaders)} <== generated request`);
    return headers;
  };

  fetch = key => {
    //axios
    const foundRequest = this.findRequestFromKey(key);
    if (foundRequest) {
      this.showDebugMessage('log', `${JSON.stringify(foundRequest)} ${strings.foundRequest}`);
      const headers = this.generateHeaders(foundRequest);
    }
  }
};
