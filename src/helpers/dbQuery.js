import { client } from "./postgresQLClient";

export default {
	request(quertText, params) {
		return new Promise((resolve, reject) => {
			client
				.query(quertText, params)
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	}
};
