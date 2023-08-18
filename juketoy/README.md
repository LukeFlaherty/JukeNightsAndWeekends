This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployed on Vercel

# Dashboard

https://vercel.com/lukeflaherty/juke

# Live Link

https://juke-lukeflaherty.vercel.app/

## To develop with stripe

STRIPE NOT WORKING 500 INTERNAL SERVER ERROR SOMETHING WITH HEADERS, FORGET ABOUT STRIPE FOR NOW

grab first two env locals from stripe and then:

1. run project npm run dev
2. stripe listen --forward-to localhost:3000/api/webhooks in seperate terminal
3. stripe trigger payment_intent.succeeded in seperate terminal
4. put in webhook secret env var

TODO: Build own version of https://www.npmjs.com/package/use-sound
