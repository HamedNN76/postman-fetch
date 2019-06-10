import axios from 'axios';

export default class PostmanFetch {
  constructor(json) {
    this.json = json;
  }

  findRequestFromKey = key => {
    const keys = key.split('.');
    const findRequest = (items, key) => {
      return items.find(item => item.name === key);
    };
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
      console.debug('There is no request with the given key!!!');
    }
  };

  fetch = key => {
    //axios
    const foundRequest = this.findRequestFromKey(key);
    console.log(foundRequest, '<== found Request');
  }
};
