Watch =
	bind: (record, prop, handler) ->
		current = record[prop]

		getter = ->
			return current

		setter = (value) ->
			handler.call(record, prop, current, value)
			return current = value

		if delete record[prop]
			if Object.defineProperty
				Object.defineProperty(record.constructor.prototype, prop,  
					get: getter,
					set: setter,
					enumerable: true,
					configurable: true
				)
			else if Object.prototype.__defineGetter__ and 
					Object.prototype.__defineSetter__
				Object.prototype.__defineGetter__.call(record.constructor.prototype, prop, getter)
				Object.prototype.__defineSetter__.call(record.constructor.prototype, prop, setter)

	unbind: (record, prop) ->
		value = record[prop]
		delete this[prop]
		record[prop] = value

	init: (model) ->
		model.bind("create", (record) ->
			trigger = (prop,previous,current) ->
				@trigger("update[#{prop}]", record, prop, current, previous)

			for attribute in model.attributes
				#if typeof record.__proto__.watch is "undefined"
					Watch.bind(record, attribute, trigger)
				#else
					#record.__proto__.watch(attribute, trigger)

			@
		)
		@

@Spine.Watch = Watch