(function() {
  var Watch;
  Watch = {
    bind: function(record, prop, handler) {
      var current, getter, proto, setter;
      current = record[prop];
      getter = function() {
        return current;
      };
      setter = function(value) {
        handler.call(record, prop, current, value);
        return current = value;
      };
      if (delete record[prop]) {
        if (Object.defineProperty) {
          return Object.defineProperty(record.constructor.prototype, prop, {
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
      model.bind("create", function(record) {
        var attribute, trigger, _i, _len, _ref;
        trigger = function(prop, previous, current) {
          return this.trigger("update[" + prop + "]", record, prop, current, previous);
        };
        _ref = model.attributes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          attribute = _ref[_i];
          Watch.bind(record, attribute, trigger);
        }
        return this;
      });
      return this;
    }
  };
  this.Spine.Watch = Watch;
}).call(this);
