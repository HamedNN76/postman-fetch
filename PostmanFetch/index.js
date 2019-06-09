import axios from 'axios';

export default class PostmanFetch {
  constructor(config) {
    this.config = config;
  }

  fetch = key => {
    //axios
    console.log(this.config.json.item.find(e => e.name === key));
  }
};
