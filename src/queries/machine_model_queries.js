export const removePricingModelFromMachine = `
UPDATE machines 
SET
deleted_at = least(deleted_at, current_timestamp)
WHERE machines.id = $1 :: uuid AND machines.pricing_id = $2 :: uuid 
RETURNING machines.id;
`;

export const updatePricingModelOfMachine = `
INSERT INTO machines(id, pricing_id, created_at)
VALUES($1 :: uuid, $2 :: uuid, current_timestamp)
ON CONFLICT ON CONSTRAINT machines_pkey DO UPDATE SET pricing_id = $2, updated_at = current_timestamp
WHERE machines.id = $1
RETURNING id, pricing_id;
`;

export const getPriceConfigForMachine = `
select machines.name AS machine_name, pricing_models.name AS pricing_model_name, prices.name AS price_name, prices.value, prices.price from 
	machines join pricing_models on machines.pricing_id = pricing_models.id  
	join pricing_model_price on pricing_models.id = pricing_model_price.pricing_model_id 
	join prices on pricing_model_price.price_id = prices.id 
	where machines.id = $1 :: uuid and machines.deleted_at is NULL
`;

export const checkIfMachineIdPresent = `
SELECT machines.id, machines.name 
FROM machines
WHERE machines.id = $1
`;
// removePricingModelFromMachineTest permanently removes the pricing model, should be used only in tests
export const removePricingModelFromMachineTest = `
UPDATE machines 
SET pricing_id = NULL
WHERE machines.id = $1 :: uuid AND machines.pricing_id = $2 :: uuid AND machines.deleted_at is null
RETURNING machines.id;
`;
