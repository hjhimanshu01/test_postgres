CREATE DATABASE task
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_India.1252'
    LC_CTYPE = 'English_India.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
\c task
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE if not exists prices (
	id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v1(),
	price INTEGER,
	name VARCHAR(50) UNIQUE,
	value INTEGER, 
	created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
	deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE TABLE if not exists pricing_models (
	id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v1(),
	name VARCHAR(50) UNIQUE,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
	deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE TABLE if not exists pricing_model_price (
	id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v1(),
	pricing_model_id UUID,
	price_id UUID,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
	deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
	FOREIGN KEY(price_id) REFERENCES prices (id) ON UPDATE CASCADE,
	FOREIGN KEY(pricing_model_id) REFERENCES pricing_models (id) ON UPDATE CASCADE,
	UNIQUE(pricing_model_id, price_id)
);

CREATE TABLE if not exists machines (
	id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v1(),
	name VARCHAR(50) UNIQUE,
	pricing_id UUID,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
	deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
	FOREIGN KEY(pricing_id) REFERENCES pricing_models (id) ON UPDATE CASCADE,
	UNIQUE(id, pricing_id)
);

INSERT INTO prices (id, price, name, value)
	VALUES
	( '75f30e9a-4d0f-11ea-9db0-00d861092d57', 3, '10 minutes', 10),
	('75f471d6-4d0f-11ea-9db1-00d861092d57', 5, '20 minutes', 20),
	('75f471d7-4d0f-11ea-9db2-00d861092d57', 15, '60 minutes', 60);
	
INSERT INTO pricing_models (id, name)
	VALUES
	('3ba92095-3203-4888-a464-3c7d5d9acd7e', 'Super Value Option'),
	('4d40de8f-68f8-4160-a83a-665dbc92d154', 'Default'),
	('48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e', 'Long Play');
	
INSERT INTO pricing_model_price(pricing_model_id, price_id)
	VALUES
	('3ba92095-3203-4888-a464-3c7d5d9acd7e', '75f30e9a-4d0f-11ea-9db0-00d861092d57'),
	('3ba92095-3203-4888-a464-3c7d5d9acd7e', '75f471d6-4d0f-11ea-9db1-00d861092d57'),
	('4d40de8f-68f8-4160-a83a-665dbc92d154', '75f30e9a-4d0f-11ea-9db0-00d861092d57'),
	('4d40de8f-68f8-4160-a83a-665dbc92d154', '75f471d6-4d0f-11ea-9db1-00d861092d57'),
	('4d40de8f-68f8-4160-a83a-665dbc92d154', '75f471d7-4d0f-11ea-9db2-00d861092d57'),
	('48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e', '75f471d7-4d0f-11ea-9db2-00d861092d57');
	
INSERT INTO machines(id, name, pricing_id)
	VALUES
	('99ade105-dee1-49eb-8ac4-e4d272f89fba', 'Machine 1', '3ba92095-3203-4888-a464-3c7d5d9acd7e'),
	('4111947a-6c58-4977-90fa-2caaaef88648', 'Machine 2', NULL),
	('57342663-909c-4adf-9829-6dd1a3aa9143', 'Machine 3', '48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e'),
	('5632e1ec-46cb-4895-bc8b-a91644568cd5', 'Machine 4', '4d40de8f-68f8-4160-a83a-665dbc92d154');