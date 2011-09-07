Watch =
	bind: (record, prop, handler) ->
		current = record[prop]
		proto = if record.__proto__ then record.__proto__ else record

		getter = ->
			return current

		setter = (value) ->
			handler.call(record, prop, current, value)
			return current = value

		if delete record[prop]
			if Object.defineProperty
				Object.defineProperty(proto, prop,  
					get: getter,
					set: setter,
					enumerable: true,
					configurable: true
				)
			else if Object.prototype.__defineGetter__ and 
					Object.prototype.__defineSetter__
				Object.prototype.__defineGetter__.call(proto, prop, getter)
				Object.prototype.__defineSetter__.call(proto, prop, setter)

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
					Watch.bind(record.__proto__, attribute, trigger)
				#else
					#record.__proto__.watch(attribute, trigger)

			@
		)
		@

@Spine.Watch = Watch