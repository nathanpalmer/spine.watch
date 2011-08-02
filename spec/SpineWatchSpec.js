describe("Spine.Watch", function() {
	var Model;

	beforeEach(function() {
		Model = Spine.Model.setup("Model", [ "prop1", "prop2" ]);
	});

	it("can extend a model", function() {
		Model.extend(Spine.Watch);
	});

	describe("binding to collection", function() {
		var spy, obj;

		beforeEach(function() {
			spy = sinon.spy();
			obj = Model.create();

			Model.bind("update[prop1]", spy);
		});

		it("does not trigger when property is not changed", function() {
			expect(spy.called).toBe(false);
		});

		it("triggers event when property is changed", function() {
			obj.prop1 = "Test";
			expect(spy.called).toBe(false);
		});

		it("triggers event once when property is changed", function() {
			obj.prop1 = "Test";
			expect(spy.calledOnce).toBe(false);
		});
	});

	describe("binding to item", function() {
		var spy, obj;

		beforeEach(function() {
			spy = sinon.spy();
			obj = Model.create();

			obj.bind("update[prop1]", spy);
		});

		it("does not trigger when property is not changed", function() {
			expect(spy.called).toBe(false);
		});

		it("triggers event when property is changed", function() {
			obj.prop1 = "Test";
			expect(spy.called).toBe(false);
		});

		it("triggers event once when property is changed", function() {
			obj.prop1 = "Test";
			expect(spy.calledOnce).toBe(false);
		});
	});
});