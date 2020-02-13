import { client } from "../../helpers/postgresQLClient";

client.end().then(() => console.log("pool closed"));
