{
	/* ideally these tests should be separated in different files
  though sommething is unnusal about these and it would need time to 
  go through exactly what is getting wrong*/
}

const request = require("supertest");
const app = require("../index");

test("root route", async () => {
	console.log(process.env.NODEENV);
	const response = await request(app.callback()).get("/");
	expect(response.status).toEqual(200);
	expect(response.type).toEqual("text/plain");
});

// get all the pricing-models from test database

test("/pricing-models get request", async () => {
	const response = await request(app.callback()).get("/pricing-models");
	const pricingModels = response.text;
	expect(response.status).toEqual(200);
	expect(pricingModels).toEqual(
		'{"pricing_models":[{"name":"Super Value Option","pricing_model_prices":[]},{"name":"Default","pricing_model_prices":[{"price":{"name":"10 minutes","value":10,"price":3}},{"price":{"name":"20 minutes","value":20,"price":5}},{"price":{"name":"60 minutes","value":60,"price":15}}]},{"name":"test for delete","pricing_model_prices":[{"price":{"name":"10 minutes","value":10,"price":3}}]},{"name":"Long Play","pricing_model_prices":[{"price":{"name":"60 minutes","value":60,"price":15}}]}]}'
	);
});

// post a new pricing model endpoint
test("/pricing-models post request", async () => {
	const variable = {
		pricingModels: [
			{
				id: "793593dc-44a8-4b53-a964-5cd0821612fa",
				name: "demo pricing model"
			}
		]
	};
	const response = await request(app.callback())
		.post("/pricing-models")
		.send(variable);
	const insertedPricingModel = response.text;
	expect(response.status).toEqual(200);

	expect(insertedPricingModel).toEqual(
		'{"insert_pricing_models":{"returning":[{"id":"793593dc-44a8-4b53-a964-5cd0821612fa"}]}}'
	);
}, 10000);

// get pricing model by modelId
test("/pricing-models/:pmId testing get pricing model by id request", async () => {
	const response = await request(app.callback()).get(
		"/pricing-models/48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e"
	);
	const pricingModels = response.text;
	expect(response.status).toEqual(200);
	expect(pricingModels).toEqual(
		'{"pricing_models":[{"id":"48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e","name":"Long Play","pricing_model_prices":[{"price":{"name":"60 minutes","price":15,"value":60}}]}]}'
	);
}, 10000);

//put req. to test picing model by id request
test("/pricing-models/:pmId testing put pricing model by id request", async () => {
	const variable = {
		pricingModels: {
			name: "demo models1"
		}
	};
	const response = await request(app.callback())
		.put("/pricing-models/48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e")
		.send(variable);
	const pricingModels = response.text;
	expect(response.status).toEqual(200);
	expect(pricingModels).toEqual(
		'{"update_pricing_models":{"returning":[{"id":"48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e","name":"demo models1"}]}}'
	);
});

// get prices of model
test("/pricing-models/:pmId/prices testing get prices of a model", async () => {
	const response = await request(app.callback()).get(
		"/pricing-models/48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e/prices"
	);

	const prices = response.text;
	expect(response.status).toEqual(200);
	expect(prices).toEqual(
		'{"pricing_models":[{"pricing_model_prices":[{"price":{"name":"60 minutes","price":15,"value":60}}]}]}'
	);
});

// post a new price config for model
test("/pricing-models/:pmId/prices add new price config for model", async () => {
	const variable = {
		price: {
			name: "100 minutes demo",
			price: 30,
			value: 100,
			deleted_at: null,
			pricing_model_prices: {
				data: {
					pricing_model_id: "3ba92095-3203-4888-a464-3c7d5d9acd7e",
					deleted_at: null
				}
			}
		}
	};
	const response = await request(app.callback())
		.post("/pricing-models/3ba92095-3203-4888-a464-3c7d5d9acd7e/prices")
		.send(variable);
	const insertedPricingModel = response.text;
	expect(response.status).toEqual(200);
	console.log(response.text);
	expect(insertedPricingModel).toEqual(
		'{"insert_prices":{"returning":[{"name":"100 minutes demo","id":"b6f03e50-59b0-4f1f-bc2d-8f4848ed8e02","pricing_model_prices":[{"pricing_model":{"name":"Super Value Option"}}]}]}}'
	);
}, 10000);

// removes price config from model by priceId
test("/pricing-models/:pmId/prices/:priceId removes price config from model", async () => {
	const response = await request(app.callback()).delete(
		"/pricing-models/3f5ac0ce-4514-4edc-a926-a55dcbeee9ab/prices/53ba3705-43bc-4bc6-9e5b-15f129d2a241"
	);

	const prices = response.text;
	expect(response.status).toEqual(200);
	expect(prices).toEqual(
		'{"update_pricing_model_price":{"returning":[{"id":"f34822cc-859a-4e88-a9f8-3a2ebab66167"}]}}'
	);
}, 10000);

// when pmId is not found,
test("/pricing-models/:pmId/prices/:priceId removes price config from model when pmId is not found", async () => {
	const response = await request(app.callback()).delete(
		"/pricing-models/3f5ac0ce-4514-4edc-a926-a65dcbeee9ab/prices/53ba3705-43bc-4bc6-9e5b-15f129d2a241"
	);

	const prices = response.text;
	expect(response.status).toEqual(200);
	expect(prices).toEqual("Not Found");
});

// test for setting the pricing model for an individual machine to one from pmId
test(" sets the pricing model for an individual machine to one from pmId ", async () => {
	const response = await request(app.callback()).put(
		"/machines/c3dc6c19-1087-47c4-87ac-3d2f3fcf0e05/prices/3ba92095-3203-4888-a464-3c7d5d9acd7e"
	);
	const prices = response.text;
	expect(response.status).toEqual(200);
	expect(prices).toEqual(
		'{"update_machines":{"returning":[{"id":"c3dc6c19-1087-47c4-87ac-3d2f3fcf0e05","pricing_id":"3ba92095-3203-4888-a464-3c7d5d9acd7e"}]}}'
	);
}, 10000);

// test for removes pricing model from machine
test("removes pricing model from machine", async () => {
	const response = await request(app.callback()).delete(
		"/machines/94415002-45fd-4a51-9ed7-827d1af502d9/prices/3ba92095-3203-4888-a464-3c7d5d9acd7e"
	);
	const prices = response.text;
	expect(response.status).toEqual(200);
	expect(prices).toEqual(
		'{"update_machines":{"returning":[{"id":"94415002-45fd-4a51-9ed7-827d1af502d9"}]}}'
	);
});

// test for getting list of machine id prices
test("get list machine id prices", async () => {
	const response = await request(app.callback()).get(
		"/machines/c2562290-200d-4274-8e91-9b53cf98c0a7/prices"
	);
	const pricingModels = response.text;
	expect(response.status).toEqual(200);
	expect(pricingModels).toEqual(
		'{"pricing_models":[{"name":"Default","pricing_model_prices":[{"price":{"name":"10 minutes","price":3,"value":10}},{"price":{"name":"20 minutes","price":5,"value":20}},{"price":{"name":"60 minutes","price":15,"value":60}}]}]}'
	);
}, 10000);
