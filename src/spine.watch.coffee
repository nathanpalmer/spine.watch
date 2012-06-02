bind = (record, prop, handler) ->
	current = record[prop]

	getter = ->
		return current

	setter = (value) ->
		handler.call(record, prop, current, value)
		return current = value

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

@Spine.Model::clone = ->
	clone = Object.create(@)

	trigger = (prop,previous,current) ->
		@trigger("update[#{prop}]", clone, prop, current, previous)

	bind(clone, attribute, trigger) for attribute in clone.constructor.attributes

	clone.bind("destroy", -> 
		unbind(this, attribute) for attribute in this.constructor.attributes
	)

	clone