import test from 'node:test';

test('synchronous passing test', (t) => {
	// This test passes because it does not throw an exception.

});

test('synchronous failing test', (t) => {
	// This test fails because it throws an exception.
	var a = 0;
	
	if (a == 0) throw new Error("a should not equal 0");
});

test('asynchronous passing test', async (t) => {
	// This test passes because the Promise returned by the async
	// function is settled and not rejected.
});
