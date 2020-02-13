var Router = require("koa-router");
import bodyParser from "koa-bodyparser";

import {
	getPricesByModelNameQuery,
	getPricingModelByIdQuery
} from "../restApi/pricing_model_api";

import {
	removePricingModelFromMachineQuery,
	updatePricingModelOfMachineQuery,
	getPriceConfigForMachineQuery,
	checkIfMachineIdPresentQuery
} from "../restApi/machine_model_api";
function register(app) {
	let router = new Router();
	router
		.use(bodyParser())
		.put("/machines/:machineId/prices/:pmId", (ctx, next) => {
			ctx.body = "prices to be shown soon";
			return getPricingModelByIdQuery([ctx.params["pmId"]]).then(
				(data, err) => {
					let { rows } = data;
					ctx.body = rows;
					if (rows.length > 0) {
						return updatePricingModelOfMachineQuery([
							ctx.params["machineId"],
							ctx.params["pmId"]
						]).then(data => {
							let { rows } = data;
							ctx.body = rows;
							return rows;
						});
					} else {
						console.log("error");
						return err;
					}
				}
			);
		})

		.delete("/machines/:machineId/prices/:pmId", async (ctx, next) => {
			let { rows } = await removePricingModelFromMachineQuery([
				ctx.params["machineId"],
				ctx.params["pmId"]
			]);
			ctx.body = rows.length > 0 ? rows : "Not found";
			return rows;
		})

		.get("/machines/:machineId/prices", async (ctx, next) => {
			/* checks if machine is present or not, if not then returns not found */
			let { rows } = await checkIfMachineIdPresentQuery([
				ctx.params["machineId"]
			]);

			if (rows.length > 0) {
				return await getPriceConfigForMachineQuery([
					ctx.params["machineId"]
				]).then(data => {
					let { rows } = data;
					ctx.body = rows;
					if (rows.length == 0) {
						return getPricesByModelNameQuery(["Default"]).then(
							data => {
								let { rows } = data;
								ctx.body = rows;
								return rows;
							}
						);
					}
				});
			} else {
				let res = "Not Found";
				ctx.body = res;
				return res;
			}
		});

	app.use(router.routes());
	app.use(router.allowedMethods());
}

module.exports = register;
