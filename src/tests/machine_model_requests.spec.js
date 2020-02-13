const request = require("supertest");
const app = require("../index");

// test for setting the pricing model for an individual machine to one from pmId
test(" sets the pricing model for an individual machine to one from pmId ", async () => {
	const response = await request(app.callback()).put(
		"/machines/c3dc6c19-1087-47c4-87ac-3d2f3fcf0e05/prices/3ba92095-3203-4888-a464-3c7d5d9acd7e"
	);
	const prices = response.text;
	expect(response.status).toEqual(200);
	expect(prices).toEqual(
		'[{"id":"c3dc6c19-1087-47c4-87ac-3d2f3fcf0e05","pricing_id":"3ba92095-3203-4888-a464-3c7d5d9acd7e"}]'
	);
});

// test for removes pricing model from machine
test("removes pricing model from machine", async () => {
	const response = await request(app.callback()).delete(
		"/machines/94415002-45fd-4a51-9ed7-827d1af502d9/prices/3ba92095-3203-4888-a464-3c7d5d9acd7e"
	);
	const prices = response.text;
	expect(response.status).toEqual(200);
	expect(prices).toEqual('[{"id":"94415002-45fd-4a51-9ed7-827d1af502d9"}]');
});

