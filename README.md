**NOTICE**: This project is no longer maintained. If you would like commit access to the repository please open up an issue. If you are still using this in production I would like to hear from you as well. It was fun putting this together but we eventually moved to different javascript framework.

# Spine.Watch

Events for property changes.

```javascript
var Model = Spine.Model.dup();
Model.configure("Model", "prop1", "prop2");

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
