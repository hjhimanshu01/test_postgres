const request = require("supertest");
const app = require("../index");

// test for getting list of machine id prices
test("get list machine id prices", async () => {
	const response = await request(app.callback()).get(
		"/machines/99ade105-dee1-49eb-8ac4-e4d272f89fba/prices"
	);
	const pricingModels = response.text;
	expect(response.status).toEqual(200);
	expect(pricingModels).toEqual(
		'[{"machine_name":"Machine 1","pricing_model_name":"Super Value Option","price_name":"10 minutes","value":10,"price":3},{"machine_name":"Machine 1","pricing_model_name":"Super Value Option","price_name":"20 minutes","value":20,"price":5}]'
	);
});

// if machine is not present then it should return Not Found, 
// 99ade105-dee1-49eb-8ac4-e4d272f89fbb no such machineId in database
test("get list machine id prices", async () => {
	const response = await request(app.callback()).get(
		"/machines/99ade105-dee1-49eb-8ac4-e4d272f89fbb/prices"
	);
	const pricingModels = response.text;
	expect(response.status).toEqual(200);
	expect(pricingModels).toEqual(
		'Not Found'
	);
});

// no pricing model for machine 2, 
// return default pricing model
test("get list machine id prices", async () => {
	const response = await request(app.callback()).get(
		"/machines/4111947a-6c58-4977-90fa-2caaaef88648/prices"
	);
	const pricingModels = response.text;
	expect(response.status).toEqual(200);
	expect(pricingModels).toEqual(
		'[{"price_name":"10 minutes","price":3,"value":10},{"price_name":"20 minutes","price":5,"value":20},{"price_name":"60 minutes","price":15,"value":60}]'
	);
});