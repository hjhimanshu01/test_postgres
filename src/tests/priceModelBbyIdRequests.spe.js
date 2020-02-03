{
	/*these files are not relevant */
}
const request = require("supertest");
const app = require("./root.spec");

import {
	editPriceModelByIdQuery,
	deletePricingModelByidQuery,
	deletePricingModelPriceByPriceidQuery
} from "../restApi/pricing_model_api";

import { removePricingModelFromMachineTestQuery } from "../restApi/machine_model_api";

test("/pricing-models/:pmId testing get pricing model by id request", async () => {
	const response = await request(app.callback()).get(
		"/pricing-models/48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e"
	);
	const pricingModels = response.text;
	expect(response.status).toEqual(200);
	expect(pricingModels).toEqual(
		'{"pricing_models":[{"id":"48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e","name":"Long Play","pricing_model_prices":[{"price":{"name":"60 minutes","price":15,"value":60}}]}]}'
	);
});

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
}, 10000);
