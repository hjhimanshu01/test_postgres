const request = require("supertest");
const app = require("../index");

// get prices of model
test("/pricing-models/:pmId/prices testing get prices of a model", async () => {
	const response = await request(app.callback()).get(
		"/pricing-models/48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e/prices"
	);

	const prices = response.text;
	expect(response.status).toEqual(200);
	expect(prices).toEqual(
		'[{"price_name":"60 minutes","price":15,"value":60}]'
	);
});

// post a new price config for model
test("/pricing-models/:pmId/prices add new price config for model", async () => {
	const variable = {
		price_id: "75f30e9a-4d0f-11ea-9db0-00d861092d57"
	};
	const response = await request(app.callback())
		.post("/pricing-models/86c2616a-4de3-11ea-913e-00d861092d57/prices")
		.send(variable);
	const insertedPricingModel = response.text;
	expect(response.status).toEqual(200);
	expect(insertedPricingModel).toEqual(
		'[{"pricing_model_id":"86c2616a-4de3-11ea-913e-00d861092d57","price_id":"75f30e9a-4d0f-11ea-9db0-00d861092d57"}]'
	);
});
