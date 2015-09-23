//! QueryHandler.js v1.2.0 | (c) 2015 Zach Dahl | MIT License
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    factory(root);
  }
})(this, function (exports) {
  "use strict";

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  exports.QueryHandler = QueryHandler;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Query = (function () {
    function Query(string) {
      _classCallCheck(this, Query);

      this.initialString = string;
      this.generateQueryObject(string);
    }

    _createClass(Query, {
      generateQueryObject: {
        value: function generateQueryObject(str) {
          this.query = {};
          var arr = str.substr(1).split("&");
          for (var i = 0, il = arr.length; i < il; ++i) {
            var current = arr[i].split("=");
            var key = decodeURIComponent(current[0]);
            var value = this.smartParse(current[1]);

            if (typeof this.query[key] === "undefined") this.query[key] = value;else if (this.query[key] instanceof Array) this.query[key].push(value);else this.query[key] = [this.query[key], value];
          }
        }
      },
      smartParse: {
        value: function smartParse(val) {
          if (typeof val === "undefined") {
            return null;
          }if (/^(true|false|null)$/i.test(val)) {
            return JSON.parse(val);
          }if (!isNaN(+val)) {
            return +val;
          }return decodeURIComponent(val);
        }
      },
      getQueryString: {
        value: function getQueryString() {
          var self = this;
          var q = this.query;
          var result = Object.keys(q).map(function (key, _) {
            var val = q[key];
            if (val instanceof Array) {
              return val.map(function (v, i) {
                return self.pairToString(key, v);
              }).join("&");
            }
            return self.pairToString(key, val);
          });
          return "?" + result.join("&");
        }
      },
      string: {
        get: function () {
          return this.getQueryString();
        }
      },
      initial: {
        get: function () {
          return this.initialString;
        }
      },
      has: {
        value: function has(key) {
          return this.query.hasOwnProperty(key);
        }
      },
      get: {
        value: function get(key, def) {
          return this.has(key) ? this.query[key] : typeof def === "undefined" ? null : def;
        }
      },
      set: {
        value: function set(key, val) {
          this.query[key] = val;
        }
      },
      remove: {
        value: function remove(key) {
          delete this.query[key];
        }
      },
      pairToString: {
        value: function pairToString(key, val) {
          key = encodeURIComponent(key);
          if (val === null) {
            return key;
          }return key + "=" + encodeURIComponent(val);
        }
      }
    });

    return Query;
  })();

  function QueryHandler(q) {
    return new Query(q);
  }
});
