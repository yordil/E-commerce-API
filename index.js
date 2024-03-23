const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.SSTRIPE_KEY);
const app = express();

app.use(cors({ origin: true }));

app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({ message: "Hello World" });
});

app.post("/payments/create", async (req, res) => {
	const total = req.query.total;

	if (total > 0) {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: total,
			currency: "usd",
		});

		res.status(201).json({
			clientSecret: paymentIntent.client_secret,
		});
	} else {
		res.status(400).send({ message: "Invalid total amount" });
	}
});

app.listen(5000 , (err) => {
    if(err){
        throw err
    }else{
        console.log("Server is running on port 5000")
    }
})
