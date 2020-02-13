const app = require("./src/index");
const PORT = process.env.PORT || 1337;

let server = app.listen(PORT, () =>
	console.log(`Server listening on port ${PORT}`)
);
module.export = server;
