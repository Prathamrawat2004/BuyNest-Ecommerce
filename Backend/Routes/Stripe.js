import express from "express";
import Stripe from "stripe";
const router = express.Router();
const stripe = Stripe(
  "sk_test_51PqWQLCrIftFU5bHths4wQP3SReR7QlLAlXKqPIJzW3nnEqKmgBcewXoWwji7O5ZTUF8vxpmI2dvsxy1tTuOeQ1300ZtUPaI3h"
);

router.post("/create-checkout-session", async (req, res) => {
  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.slug,
          images: [item.urls.regular],
          description: item.alt_description,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: 80000,
      },
      quantity: item.cartQuantity,
    };
  });

  try {
    const frontendUrl = req.headers.origin;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "KE", "IN"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free shipping",
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Next day air",
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      line_items: line_items,
      mode: "payment",
      success_url: `${frontendUrl}/checkout-success`,
      cancel_url: `${frontendUrl}/cart`,
    });

    res.send({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send(`Error creating checkout session: ${error.message}`);
  }
});

export default router;
