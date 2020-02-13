export const pricingModelList = `

  SELECT pricing_models.id, pricing_models.name AS pricing_model_name  
  FROM pricing_models 
  WHERE pricing_models.deleted_at is NULL
`;

export const insertPricingModel = `
INSERT INTO pricing_models
VALUES(COALESCE($1 :: uuid, uuid_generate_v1()), $2 :: varchar)
RETURNING pricing_models.id, pricing_models.name
`;

export const getPricingModelById = `
  SELECT pm.name AS pricing_model_name,
  prices.name AS price_name,
  prices.price,
  prices.value
  FROM pricing_models AS pm
  LEFT JOIN pricing_model_price AS pmp
  ON pm.id = pmp.pricing_model_id
  JOIN prices
  ON prices.id = pmp.price_id
  WHERE pm.id = $1 :: uuid AND pm.deleted_at is NULL AND prices.deleted_at is NULL
  ORDER BY pricing_model_name
  `;

export const editPriceModelById = `
UPDATE pricing_models SET 
    name = COALESCE($3 :: varchar, name),
    id = COALESCE($2 :: uuid, id),
    deleted_at = null,
    updated_at = current_timestamp
WHERE id = $1 :: uuid
AND  ($3 IS DISTINCT FROM name 
        OR $2 IS DISTINCT FROM id)
RETURNING id, name;
`;

export const getPricesByModelId = `
  SELECT prices.name AS price_name,
  prices.price,
  prices.value
  FROM pricing_models AS pm
  LEFT JOIN pricing_model_price AS pmp
  ON pm.id = pmp.pricing_model_id
  JOIN prices
  ON prices.id = pmp.price_id
  WHERE pm.id = $1 :: uuid 
  AND pm.deleted_at is NULL 
  AND prices.deleted_at is NULL 
  AND pmp.deleted_at is NULL
  ORDER BY pm.name
  `;

export const addNewPriceConfigById = `
INSERT into pricing_model_price(pricing_model_id, price_id) 
    VALUES($1 :: uuid, $2 :: uuid)
ON CONFLICT ON CONSTRAINT pricing_model_price_pricing_model_id_price_id_key DO UPDATE SET deleted_at = null
RETURNING pricing_model_id, price_id;
`;

export const deletePriceConfigFromModel = `
UPDATE pricing_model_price 
SET deleted_at = least(deleted_at, current_timestamp)
WHERE pricing_model_id = $1 :: uuid AND price_id = $2 :: uuid
RETURNING pricing_model_id, price_id;
`;

export const getPricesByModelName = `
SELECT prices.name AS price_name,
  prices.price,
  prices.value
  FROM pricing_models AS pm
  LEFT JOIN pricing_model_price AS pmp
  ON pm.id = pmp.pricing_model_id
  JOIN prices
  ON prices.id = pmp.price_id
	  WHERE pm.name = $1 :: varchar
  AND pm.deleted_at is NULL 
  AND prices.deleted_at is NULL 
  AND pmp.deleted_at is NULL
  ORDER BY pm.name
`;
// delete pricingModelsById to be only used in scripts for testing database

export const deletePricingModelByid = `DELETE FROM pricing_models
WHERE pricing_models.id = $1
RETURNING pricing_models.id
`;

// deletePricingModelPriceByPriceid to be only used in scripts for testing database

export const deletePricingModelPriceByPriceid = `
DELETE FROM pricing_model_price
WHERE pricing_model_id = $1
AND price_id = $2
`;
