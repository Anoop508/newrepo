const express = require("express");
const cors = require("cors");
const path = require('path')
const Axios = require("axios");
const app = express();
const PORT = process.env.NODE_ENV || 5000

app.use(express.static(path.join(__dirname + "/public")))

app.use(cors());
app.use(express.json());



app.post("/compile", (req, res) => {
	//getting the required data from the request
	let code = req.body.code;
	let language = req.body.language;
	let input = req.body.input;

	if (language === "python") {
		language="py"
	}

	let data = ({
		// "code": code,
		// "language": language,
		// "input": input,
		"script" : code,
        "language": "python3",
        "versionIndex": "0",
        "clientId": "c0a58042b45adabe3c665135d8bb5b75",
        "clientSecret":"acb8f2923608eeb72810c2268267d4ea488ee4ded25ac49c979f1e650d8023a0"
	});
	let config = {
		method: 'post',
		url: 'https://stage.jdoodle.com/execute',
		headers: {
			'Content-Type': 'application/json'
		},
		data: data
	};
	//calling the code compilation API
	Axios(config)
		.then((response)=>{
			res.send(response.data)
			console.log(response.data)
		}).catch((error)=>{
			console.log(error);
		});
})

app.listen(process.env.PORT || PORT, () => {
	console.log(`Server listening on port ${PORT}`);

});
