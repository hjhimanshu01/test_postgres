require("dotenv").config();

const { Pool, Client } = require("pg");
const isTest = process.env.NODEENV === "test";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const connectionStringTest = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE_TEST}`;

const client = new Client({
	connectionString: isTest ? connectionStringTest : connectionString
});

(async function() {
	await client.connect();
})();
module.exports = { client };
