(function() {
  var bind, unbind;
  bind = function(record, prop, handler) {
    var current, getter, setter;
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
        return Object.defineProperty(record, prop, {
          get: getter,
          set: setter,
          enumerable: true,
          configurable: true
        });
      } else if (Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__) {
        Object.prototype.__defineGetter__.call(record, prop, getter);
        return Object.prototype.__defineSetter__.call(record, prop, setter);
      }
    }
  };
  unbind = function(record, prop) {
    var value;
    value = record[prop];
    delete this[prop];
    return record[prop] = value;
  };
  this.Spine.Model.prototype.clone = function() {
    var attribute, clone, trigger, _i, _len, _ref;
    clone = Object.create(this);
    trigger = function(prop, previous, current) {
      return this.trigger("update[" + prop + "]", clone, prop, current, previous);
    };
    _ref = clone.constructor.attributes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      attribute = _ref[_i];
      bind(clone, attribute, trigger);
    }
    clone.bind("destroy", function() {
      var attribute, _j, _len2, _ref2, _results;
      _ref2 = this.constructor.attributes;
      _results = [];
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        attribute = _ref2[_j];
        _results.push(unbind(this, attribute));
      }
      return _results;
    });
    return clone;
  };
}).call(this);
