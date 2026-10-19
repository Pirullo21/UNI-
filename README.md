# Veloura

Static bilingual luxury-car rental site with Vercel serverless endpoints for Stripe Checkout.

## Run locally

1. Install Node.js 20 or later and the Vercel CLI.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`; set `STRIPE_SECRET_KEY` to a Stripe **test** secret key and `APP_URL` to `http://localhost:3000`.
4. Run `vercel dev` and open the local URL it prints. Do not test payment endpoints by opening the HTML files with `file://`.
5. Use a Stripe test card, such as `4242 4242 4242 4242`, with any future expiry date and any CVC.

## Deploy to Vercel

1. Import this repository into Vercel and deploy it as a standard project. The `api/` functions are deployed as serverless endpoints.
2. In Vercel project settings, add `STRIPE_SECRET_KEY` and `APP_URL` for the production environment. Set `APP_URL` to the canonical HTTPS website URL. Keep the Stripe secret key server-side; never add it to HTML, browser JavaScript, or a public environment variable.
3. First use Stripe test keys and test mode. After verifying the checkout and return flow, add the live secret key in Vercel's production environment and redeploy.
4. In Stripe Dashboard, enable automatic receipts for successful payments and set the receipt branding/support details. Checkout collects the customer email; Stripe sends the receipt only after the payment succeeds.

The confirmation page verifies the Checkout Session with Stripe before showing a paid status. The server calculates prices from the vehicle catalogue, not from browser-submitted totals. The payment charges the displayed rental total immediately. Vehicle availability is not checked by this prototype and must still be confirmed by the concierge; the payment receipt is not an availability guarantee.

Rental rates, taxes, insurance, deposit, cancellation/refund policies, and any required business/legal disclosures should be confirmed before accepting live payments.