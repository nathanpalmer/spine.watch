# Spine.Watch

Events for property changes.

```javascript
var Model = Spine.Model.setup("Model", [ "prop1", "prop2" ]);

Spine.Watch.init(Model);

Model.bind("update[prop1]", function(record,prop,value) {
	// record: the record the property is on
	// prop: the name of the property
	// value: the new value
});

var obj = Model.create();
obj.bind("update[prop1]", function(record,prop,value) {
	// Same as previous but only fires for that record
});
```
