{
	/*these files are not relevant */
}
const request = require("supertest");
const app = require("./root.spec");
import {
	deletePricingModelByidQuery,
	deletePricingModelPriceByPriceidQuery
} from "../restApi/pricing_model_api";

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
