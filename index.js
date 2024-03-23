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
	
	try {
		const total = req.query.total;
		if (total > 0) {
			const paymentIntent = await stripe.paymentIntents.create({
				amount: parseInt(total),
				currency: "usd",
			});
	
			res.status(201).json({
				clientSecret: paymentIntent.client_secret,
			});
		} else {
			res.status(403).json({ message: "Invalid total amount" });
		}
	}catch(error){
		res.status(500).send({ message: "SErver error " });
	}
});

app.listen(5000 , (err) => {
    if(err){
        throw err
    }else{
        console.log("Server is running on port 5000")
    }
})
