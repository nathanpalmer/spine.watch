Watch =
	bind: (record, prop, handler) ->
		previous = record[prop]
		current = previous

		getter = ->
			return previous

		setter = (value) ->
			previous = current
			return current = handler.call(record, prop, previous, value)

		if delete record[prop]
			if Object.defineProperty
				Object.defineProperty(record.__proto__, prop,  
					get: getter,
					set: setter,
					enumerable: true,
					configurable: true
				)
			else if Object.prototype.__defineGetter__ and Object.prototype.__defineSetter__
				Object.prototype.__defineGetter__.call(record, prop, getter)
				Object.prototype.__defineSetter__.call(record, prop, setter)

	unbind: (record, prop) ->
		value = record[prop]
		delete this[prop]
		record[prop] = value

	init: (model) ->
		model.bind("create", (record) ->
			for attribute in model.attributes
				Watch.bind(record.__proto__, attribute, (prop,previous,current) ->
					console.log("trigger update[#{prop}]")
					@trigger("update[#{prop}]", record, prop, current, previous)
				)
				console.log(attribute)
		)


@Spine.Watch = Watch