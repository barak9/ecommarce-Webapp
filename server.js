const Stripe = require('stripe');

const cors = require("cors");
const express = require("express");
const bodyparser = require('body-parser')
const shortid = require('shortid')
const uuid = require("uuid").v4;
const app = express();
const Razorpay = require('razorpay')
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(express.json());
app.use(cors());
const razorpay = new Razorpay({
	key_id: 'rzp_live_yTzT1C25rSd0d0',
	key_secret: 'MGnNlKOidBdCpeic9RfycwYj'
})
app.get("/welcome", (req, res) => {
  res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
});
app.get("/error", (req, res) => {
  res.send("The error Page");
});
app.get('/razorpay', async (req, res) => {
  
  try {
    
  const { product, token,price } = req.body;
  console.log("Product", product);

	const options = {
    payment_capture: 1,
      amount:product.price*100,
      currency:'INR',
      qty:product.qty,
      address:'',
      pincode:'',


		receipt: shortid.generate(),

	}


		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
      qty:response.qty,
			currency: response.currency,
      qty:product.qty,
			amount: response.amount,
      address:'Welcome',
      pincode:'',
		})
	} catch (error) {
		console.log(error)
    
	}
})



app.post('/razorpay', async (req, res) => {
  
  try {
    
  const { product, token,price, address } = req.body;
  console.log("Product", product);

	const options = {
    payment_capture: 1,
      amount:product.price*100,
      currency:'INR',
      notes: {
        address:'',
        pincode:'',
      },

 
  
		receipt: shortid.generate(),

	}


		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
   
			currency: response.currency,
			amount: response.amount,
  
		})
	} catch (error) {
		console.log(error)

	}
})




















app.post("/payment", (req, res)=>{
  const { product, token } = req.body;
  console.log("Product", product);
  console.log("PRICE", product.price);
 
  return stripe.customers.create({
    email: token.email,
    source: token.id
  }).then(customer=>{
    stripe.charges.create({
      amount:product.price * 100,
      currency: 'usd',
      customer: customer.id,
      receipt_email: token.email,
      description: `Purchased the ${product.name}`,
      shipping: {
        name: token.card.name,
        address: {
          line1: token.card.address_line1,
          line2: token.card.address_line2,
          city: token.card.address_city,
          country: token.card.address_country,
          postal_code: token.card.address_zip
        }
      }
    })
  })
  .then(result=>res.status(200).json(result))
  .catch(err=>console.log(err))

})


app.post("/checkout", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotencykey = uuid();
    const charge = await stripe.charges.create(
      {
        payment_method_types: ['card'],
      mode: 'payment',
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotencykey,
      }
    );
    console.log("Charge:", { charge  });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});



app.post("/checkout2", async (req, res) => {
const { product, token } = req.body;
console.log("Request:", req.body);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
      mode: 'payment',
    
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        amount:product.price * 100,
        currency: 'inr',
      
        description: product.name,
        name: token.card.name,
        quantity:1,
        city: token.card.city,
 
      line1: token.card.line1,
   
     state: token.card.state,
     postcode:  token.card.postcode,


    

       
      
      },
    ],





    success_url: `http://localhost:5000/welcome`,
    cancel_url: `http://ittrainingclasses.in/error`,
  });
res.status(200).json({ sessionID: session.id,})
  res.redirect(303, session.url);
});



app.listen(5000);