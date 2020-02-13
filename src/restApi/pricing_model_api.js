import postgresQLClient from "../helpers/dbQuery";
import {
	pricingModelList,
	insertPricingModel,
	getPricingModelById,
	editPriceModelById,
	getPricesByModelId,
	addNewPriceConfigById,
	deletePriceConfigFromModel,
	deletePricingModelByid,
	deletePricingModelPriceByPriceid,
	getPricesByModelName
} from "../queries/pricing_model_queries";

export function getPriceModelListQuery() {
	return postgresQLClient.request(pricingModelList);
}

export function insertPricingModelQuery(variables) {
	return postgresQLClient.request(insertPricingModel, variables);
}

export function getPricingModelByIdQuery(variables) {
	return postgresQLClient.request(getPricingModelById, variables);
}

export function editPriceModelByIdQuery(variables) {
	return postgresQLClient.request(editPriceModelById, variables);
}

export function getPricesByModelIdQuery(variables) {
	return postgresQLClient.request(getPricesByModelId, variables);
}

export function addNewPriceConfigByIdQUery(variables) {
	return postgresQLClient.request(addNewPriceConfigById, variables);
}

export function getPricesByModelNameQuery(variables) {
	return postgresQLClient.request(getPricesByModelName, variables);
}
export function deletePriceConfigFromModelQuery(variables) {
	return postgresQLClient.request(deletePriceConfigFromModel, variables);
}

// delete pricingModelsById to be only used in scripts for testing database
export function deletePricingModelByidQuery(variables) {
	return postgresQLClient.request(deletePricingModelByid, variables);
}

// deletePricingModelPriceByPriceid to be only used in scripts for testing database
export function deletePricingModelPriceByPriceidQuery(variables) {
	return postgresQLClient.request(
		deletePricingModelPriceByPriceid,
		variables
	);
}
