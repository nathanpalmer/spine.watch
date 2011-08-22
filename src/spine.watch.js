(function() {
  var Watch;
  Watch = {
    bind: function(record, prop, handler) {
      var current, getter, previous, proto, setter;
      previous = record[prop];
      current = previous;
      proto = record.__proto__ ? record.__proto__ : record;
      getter = function() {
        return previous;
      };
      setter = function(value) {
        previous = current;
        return current = handler.call(record, prop, previous, value);
      };
      if (delete record[prop]) {
        if (Object.defineProperty) {
          return Object.defineProperty(proto, prop, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
          });
        } else if (Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__) {
          Object.prototype.__defineGetter__.call(proto, prop, getter);
          return Object.prototype.__defineSetter__.call(proto, prop, setter);
        }
      }
    },
    unbind: function(record, prop) {
      var value;
      value = record[prop];
      delete this[prop];
      return record[prop] = value;
    },
    init: function(model) {
      return model.bind("create", function(record) {
        var attribute, _i, _len, _ref, _results;
        _ref = model.attributes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          attribute = _ref[_i];
          Watch.bind(record.__proto__, attribute, function(prop, previous, current) {
            console.log("trigger update[" + prop + "]");
            return this.trigger("update[" + prop + "]", record, prop, current, previous);
          });
          _results.push(console.log(attribute));
        }
        return _results;
      });
    }
  };
  this.Spine.Watch = Watch;
}).call(this);
