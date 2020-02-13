import postgresQLClient from "../helpers/dbQuery";

import {
	removePricingModelFromMachine,
	updatePricingModelOfMachine,
	getPriceConfigForMachine,
	removePricingModelFromMachineTest,
	checkIfMachineIdPresent
} from "../queries/machine_model_queries";

export function removePricingModelFromMachineQuery(variables) {
	return postgresQLClient.request(removePricingModelFromMachine, variables);
}

export function updatePricingModelOfMachineQuery(variables) {
	return postgresQLClient.request(updatePricingModelOfMachine, variables);
}

export function getPriceConfigForMachineQuery(variables) {
	return postgresQLClient.request(getPriceConfigForMachine, variables);
}

export function checkIfMachineIdPresentQuery(variables) {
	return postgresQLClient.request(checkIfMachineIdPresent, variables);
}
// removePricingModelFromMachineTest permanently removes the pricing model, should be used only in tests
export function removePricingModelFromMachineTestQuery(variables) {
	return postgresQLClient.request(
		removePricingModelFromMachineTest,
		variables
	);
}
