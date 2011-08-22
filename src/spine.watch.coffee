Watch =
	bind: (record, prop, handler) ->
		previous = record[prop]
		current = previous
		proto = if record.__proto__ then record.__proto__ else record

		getter = ->
			return previous

		setter = (value) ->
			previous = current
			return current = handler.call(record, prop, previous, value)

		if delete record[prop]
			if Object.defineProperty
				Object.defineProperty(proto, prop,  
					get: getter,
					set: setter,
					enumerable: true,
					configurable: true
				)
			else if Object.prototype.__defineGetter__ and Object.prototype.__defineSetter__
				Object.prototype.__defineGetter__.call(proto, prop, getter)
				Object.prototype.__defineSetter__.call(proto, prop, setter)

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