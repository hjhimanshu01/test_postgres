var Router = require("koa-router");
import bodyParser from "koa-bodyparser";

import {
	getPriceModelListQuery,
	insertPricingModelQuery,
	getPricingModelByIdQuery,
	editPriceModelByIdQuery,
	getPricesByModelIdQuery,
	addNewPriceConfigByIdQUery,
	deletePriceConfigFromModelQuery,
	getPricesByModelNameQuery
} from "../restApi/pricing_model_api";

function register(app) {
	let router = new Router();
	router
		.use(bodyParser())
		.get("/",async (ctx, next) => {
			let res = "hello world"
			ctx.body = res;
			return res;
		})
		.get("/pricing-models", async (ctx, next) => {
			let { rows } = await getPriceModelListQuery();
			ctx.body = rows;
			return rows;
		})

		.post("/pricing-models", async (ctx, next) => {
			let { rows } = await insertPricingModelQuery([
				ctx.request.body.pricingModels.id,
				ctx.request.body.pricingModels.name
			]);
			ctx.body = rows;
			return rows;
		})

		.get("/pricing-models/:pmId", async (ctx, next) => {
			let { rows } = await getPricingModelByIdQuery([ctx.params["pmId"]]);
			ctx.body = rows.length > 0 ? rows : "Not Found";
			return rows;
		})

		.put("/pricing-models/:pmId", async (ctx, next) => {
			let { rows } = await editPriceModelByIdQuery([
				ctx.params["pmId"],
				ctx.request.body.pricingModels.id,
				ctx.request.body.pricingModels.name
			]);
			ctx.body = rows;
			return rows;
		})

		.get("/pricing-models/:pmId/prices", async (ctx, next) => {
			let { rows } = await getPricesByModelIdQuery([ctx.params["pmId"]]);
			ctx.body = rows;
			return rows;
		})

		.post("/pricing-models/:pmId/prices", async (ctx, next) => {
			let pmId = ctx.params["pmId"];
			let priceId = ctx.request.body.price_id;

			let { rows } = await addNewPriceConfigByIdQUery([pmId, priceId]);
			ctx.body = rows;
			return rows;
		})

		.delete("/pricing-models/:pmId/prices/:priceId", async (ctx, next) => {
			let { rows } = await deletePriceConfigFromModelQuery([
				ctx.params["pmId"],
				ctx.params["priceId"]
			]);
			ctx.body = rows.length > 0 ? rows : "Not Found";
			return rows;
		});
	app.use(router.routes());
	app.use(router.allowedMethods());
}

module.exports = register;
