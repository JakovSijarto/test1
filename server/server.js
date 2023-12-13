require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors({
  origin:"http://localhost:5500",
}))

const stripe = require('stripe')("sk_test_51MFvJjGp8AV7HwpgNwwtOwrdddWVOUgT8geaoYasK9hgRUVgBbmxiidWcTslDnACcKElJBfpJ5Qvm4HutsGsnhzS00cIhYeEJP")

const storeItems = new Map([
   [1, {priceInCents: 1000, name: 'IVAN SIJARTO'}],
   [2, {priceInCents: 3000, name: 'NAUČI BIT MICKO'}]
])

app.post("/create-checkout-session", async (req,res) => {
   try {
     const session = await stripe.checkout.sessions.create({
       payment_method_types: ["card"],
       mode: "payment",
       line_items: req.body.items.map(item => {
         const storeItem = storeItems.get(item.id)
         return {
           price_data: {
             currency: "usd",
             product_data: {
               name: storeItem.name,
             },
             unit_amount: storeItem.priceInCents,
           },
           quantity: item.quantity,
         }
       }),
       success_url: `http://localhost:5500/src/client/success.html`,
       cancel_url: `http://localhost:5500/src/client/cancel.html`,
     })
     res.json({ url: session.url })
   } catch (e) {
     res.status(500).json({ error: e.message })
   }
 })

app.listen(3000)