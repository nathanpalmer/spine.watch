bind = (record, prop, handler) ->
	current = record[prop]

	getter = ->
		return current

	setter = (value) ->
                previous = current
                current = value
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

rop] = value


op] = value


eWatch: ->



eWatch: ->
  trigger = (prop,previous,current) ->
s,current) ->
          @trigger("update[#{prop}]", current, prop, previous)

p, previous)

  bind(@, attribute, trigger) for attribute in @constructor.attributes

r.attributes

  @bind("destroy", ->
"destroy", ->
          unbind(@, attribute) for attribute in @constructor.attributes
or.attributes
  )

tributes
  )

  @watchEnabled = true
