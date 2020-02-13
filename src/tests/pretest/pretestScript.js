import {
	editPriceModelByIdQuery,
	deletePricingModelByidQuery,
	deletePricingModelPriceByPriceidQuery
} from "../../restApi/pricing_model_api";

import { removePricingModelFromMachineTestQuery } from "../../restApi/machine_model_api";
import { client } from "../../helpers/postgresQLClient";
// for renaming back to Long Play from demo models1
editPriceModelByIdQuery([
	"48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e",
	null,
	"Long Play"
]).then(() => console.log("editPriceModelByIdQuery"));

// for removing demo model in prices model

deletePricingModelByidQuery(["793593dc-44a8-4b53-a964-5cd0821612fa"]).then(() =>
	console.log("deletePricingModelByidQuery")
);

deletePricingModelPriceByPriceidQuery([
	"86c2616a-4de3-11ea-913e-00d861092d57",
	"75f30e9a-4d0f-11ea-9db0-00d861092d57"
]);

removePricingModelFromMachineTestQuery([
	"c3dc6c19-1087-47c4-87ac-3d2f3fcf0e05",
	"3ba92095-3203-4888-a464-3c7d5d9acd7e"
]).then(() => client.end().then(() => {console.log('removePricingModelFromMachineTestQuery called and client closed')}));

