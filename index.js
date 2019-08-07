function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import axios from 'axios';
import strings from './strings';

var PostmanFetch = function PostmanFetch(json) {
  var _this = this;

  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _classCallCheck(this, PostmanFetch);

  this.setVariables = function (newVariables) {
    _this.variables = _objectSpread({}, _this.variables, newVariables);
  };

  this.showDebugMessage = function (mode, message) {
    if (_this.debug) {
      console[mode]("\n ==> ".concat(message, " <== \n"));
    }
  };

  this.findRequestFromKey = function (key) {
    var keys = key.split('.');

    var findRequest = function findRequest(items, key) {
      return items.find(function (item) {
        return item.name === key;
      });
    };

    var foundRequest;
    var startedPoint = _this.json.item;

    for (var i = 0; i < keys.length; i++) {
      var foundItem = findRequest(startedPoint, keys[i]);

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
      _this.showDebugMessage('debug', strings.noRequestFound);
    }
  };

  this.replaceVariablesInString = function (value) {
    var regex = /\{{(.*)\}}/;

    if (regex.test(value)) {
      var property = value.match(regex).pop();
      var variable = _this.variables[property];
      return value.replace(regex, variable);
    }

    return value;
  };

  this.generateObjects = function () {
    var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var generatedItems = {};
    items.forEach(function (item) {
      if (!!item.value) {
        generatedItems[item.key] = _this.replaceVariablesInString(item.value);
      }
    });
    return generatedItems;
  };

  this.fetch = function (key) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _ref$data = _ref.data,
        data = _ref$data === void 0 ? {} : _ref$data,
        _ref$params = _ref.params,
        params = _ref$params === void 0 ? {} : _ref$params,
        restConfig = _objectWithoutProperties(_ref, ["data", "params"]);

    var foundRequest = _this.findRequestFromKey(key);

    if (foundRequest) {
      _this.showDebugMessage('log', "".concat(JSON.stringify(foundRequest), " ").concat(strings.foundRequest));

      var collectionBodyParams = foundRequest.body && foundRequest.body[foundRequest.body.mode] || {};
      var collectionQueryParams = foundRequest.url.query || {};

      if (data) {
        _this.showDebugMessage('log', strings.logRequestAndFetchParams(collectionBodyParams, data, 'body params'));
      }

      if (params) {
        _this.showDebugMessage('log', strings.logRequestAndFetchParams(collectionQueryParams, params, 'query params'));
      }

      var headers = _objectSpread({}, _this.generateObjects(foundRequest.header, 'headers'), _this.headers);

      var url = _this.urlGenerator(foundRequest);

      var options = _objectSpread({
        url: url,
        method: foundRequest.method,
        data: data,
        params: params,
        headers: headers
      }, restConfig);

      _this.showDebugMessage('log', strings.logRequestOptions(options));

      if (options.type === 'formdata') {
        options.data = new FormData();

        for (var _key in data) {
          if (typeof _key === 'string' && data.hasOwnProperty(_key) && typeof data[_key] !== 'undefined') {
            options.data.append(_key, data[_key]);
          }
        }
      }

      return axios(options);
    }
  };

  this.urlGenerator = function (request) {
    var host = _this.replaceVariablesInString(request.url.host[0]);

    var path = request.url.path.map(function (item) {
      return _this.replaceVariablesInString(item);
    }).join('/');
    return "".concat(host, "/").concat(path);
  };

  this.json = json["default"];
  this.variables = config.variables || {};
  this.headers = config.headers || {};
  this.debug = config.debug || false;
};

export { PostmanFetch as default };
export { PostmanFetch };
