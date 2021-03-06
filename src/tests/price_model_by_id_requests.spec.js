const request = require("supertest");
const app = require("../index");

// get pricing model by modelId
test("/pricing-models/:pmId testing get pricing model by id request", async () => {
	const response = await request(app.callback()).get(
		"/pricing-models/48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e"
	);
	const pricingModels = response.text;
	expect(response.status).toEqual(200);
	expect(pricingModels).toMatch(/Long Play/);
	expect(pricingModels).toMatch(/60 minutes/);
	expect(pricingModels).toMatch(/15/);
});

//put req. to test picing model by id request
test("/pricing-models/:pmId testing put pricing model by id request", async () => {
	const variable = {
		pricingModels: {
			id: "48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e",
			name: "demo models1"
		}
	};
	const response = await request(app.callback())
		.put("/pricing-models/48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e")
		.send(variable);
	const pricingModels = response.text;
	expect(response.status).toEqual(200);
	expect(pricingModels).toEqual(
		'[{"id":"48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e","name":"demo models1"}]'
	);
});
