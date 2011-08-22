describe("Spine.Watch", function() {
	var Model;

	beforeEach(function() {
		Model = Spine.Model.setup("Model", [ "prop1", "prop2" ]);
		Spine.Watch.init(Model)
	});

	describe("binding to collection", function() {
		var spy1, spy2, obj;

		beforeEach(function() {
			spy1 = sinon.spy();
			spy2 = sinon.spy();
			obj = Model.create();

			Model.bind("update[prop1]", spy1);
			Model.bind("update[prop2]", spy2);
		});

		it("does not trigger when property is not changed", function() {
			expect(spy1.called).toBe(false);
			expect(spy2.called).toBe(false);
		});

		it("triggers event when property is changed", function() {
			obj.prop1 = "Test";
			runs(function() {
				expect(spy1.called).toBe(true);
				expect(spy2.called).toBe(false);
			}, 250);
		});

		it("triggers event once when property is changed", function() {
			obj.prop1 = "Test";
			expect(spy1.calledOnce).toBe(true);
			expect(spy2.called).toBe(false);
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
			runs(function() {
				expect(spy.called).toBe(true);	
			}, 250);
		});

		it("triggers event once when property is changed", function() {
			obj.prop1 = "Test";
			runs(function() {
				expect(spy.calledOnce).toBe(true);
			});
		});
	});
});