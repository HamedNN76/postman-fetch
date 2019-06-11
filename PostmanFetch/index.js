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

  fetch = key => {
    //axios
    const foundRequest = this.findRequestFromKey(key);
    this.showDebugMessage('log', `${foundRequest} ${strings.foundRequest}`);
  }
};
