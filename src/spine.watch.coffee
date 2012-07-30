bind = (record, prop, handler) ->
	current = record[prop]

	getter = ->
		return current

	setter = (value) ->
		return if current is value
		return if current and value and typeof current is 'object' and typeof value is 'object' and Object.getPrototypeOf(current) is Object.getPrototypeOf(value)
		previous = current
		current = value
		#console.log("Updating #{prop} from '#{previous}' to '#{current}'")
		handler.call(record, prop, current, value)

	if delete record[prop]
		if Object.defineProperty
			Object.defineProperty(record, prop,  
				get: getter,
				set: setter,
				enumerable: true,
				configurable: true
			)
		else if Object.prototype.__defineGetter__ and 
				Object.prototype.__defineSetter__
			Object.prototype.__defineGetter__.call(record, prop, getter)
			Object.prototype.__defineSetter__.call(record, prop, setter)

unbind = (record, prop) ->
	value = record[prop]
	delete this[prop]
	record[prop] = value

Watch =
	prepareWatch: (model,callback) ->
		trigger = (prop,previous,current) ->
			if callback
				callback("update[#{prop}]", current, prop, previous)
			else
				@trigger("update[#{prop}]", current, prop, previous)

		if model
			bind(model, attribute, trigger) for attribute of model
		else
			bind(@, attribute, trigger) for attribute in @constructor.attributes

			@bind("destroy", -> 
				unbind(@, attribute) for attribute in @constructor.attributes
			)

		@watchEnabled = true
		
		@

Watch.activators = [ "prepareWatch" ] if Spine.Activator

@Spine.Watch = Watch