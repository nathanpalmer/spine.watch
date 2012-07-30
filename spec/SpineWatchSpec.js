describe("Spine.Watch", function() {
	var Model;

	beforeEach(function() {
		Model = Spine.Model.sub()
		Model.configure("Model", "prop1", "prop2");
		Model.include(Spine.Watch);
	});

	describe("binding to collection", function() {
		var spy1, spy2, obj;

		beforeEach(function() {
			spy1 = sinon.spy();
			spy2 = sinon.spy();
			obj = new Model();

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
			obj = new Model();

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

		it("doesnt change the value", function() {
			obj.prop1 = "Test";
			runs(function() {
				expect(obj.prop1).toBe("Test");
			}, 250);
		});

		it("only changes current model", function() {
			obj.prop1 = "base";

			var obj1 = obj.clone();
			var obj2 = obj.clone();

			obj1.prop1 = "Test";
			expect(obj2.prop1).toBe("base")
		});

	});
});