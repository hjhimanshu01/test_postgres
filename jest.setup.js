import { client } from "./src/helpers/postgresQLClient";
jest.setTimeout(12000);

afterAll(async () => {
	await client.end();
	await client.on("drain", client.end.bind(client));
});
