### What are we??

- An investment platform for listeners to invest in artists
- An additional revenue stream for artists
- A music player experience for listeners

### Can I listen to music?

- We are doing our best to bring you an in-app premium listening experience for all artists.

### Any music making tools?

- We are doing our best to bring a suite of exculsive tools to producers on our platform

### What if I dont know anything about crypto or web3?

That is fine because we use email wallets and guest wallets that allow you to have a low-knowledge experience and buy shares of your favorite artists with nothing but your credit card. While still seeing your shares in your wallet!

- Dont worry, if you make a wallet in the future, we will transfer your shares free of charge!

- Need to find out what music labels can do about all this, maybe they cant do anything? idk, im not going to give them anything

- Do we autopopulate the artists? But not add their music?
  I think this is a good idea because then you could put "This artist has not joined Juke, heres a link to their socials to tell them to join!

### Theory?

Our question is how to onboard new users right into web 3

- allow account creation officially or bringing in outside accounts
- abstract accounts for those who dont have ones
- - make sure the info is transferrable in the future to other accounts
- - gasless? where does it fit in?
- - can you prefund these accounts?
- - account info dashboard in profile to show available balance IF you cant get it in Thirdweb icon
- copy for the connect button? only needed to buy and links to what you own

- give money in exchange for artist tokens: What are the tokens representing?
- - shares of the artist?? No, its weird
- - its just share prices in the artist, supply demand
- - only 10,000 coins, you get a certain amount of the coins and their future value as the artist gains popularity

Artist controls how diluted their stuff is like a company does in the market

By creating more shares they could tank their own stuff

- NEW THEORY

force the account creation on the user, but make it as easy as possible
such as automatically when account is created with email
offer ability to transfer to own wallet later

When person creates account, we grab the email and use it to create an email wallet for the user.
We then automatically connect their account to their profile

- autograb email and display in account tab
- autocreate wallet how
  LATER:
  We allow them to switch to a personal account in the account tab
  Deletes the email wallet and transfers the shares to the new wallet

  What am I doing?
  I am going to displat the email of the account in the account tab
  and then autocreate wallets for users on account creation

  - figure out how to modify the account creation page
  - how to generate the wallets on account creation
    -- account abstraction?

  watch the youtube video on account abstraction
  I am going to display the email in the account tab as a non editable option for now
  I am then going to work on permissing accounts to users on account creation and on sign in if they dont have one.

  - That is done by creating a smart wallet for them in thirdweb and displaying the information about that in the account tab. Userdoes not need any other info

# Post first attempt:

So I couldnt get the smart contract to auto create an account to work with the supabase account creation. I think maybe I can get it working but it would need to fully commit to thirdweb, maybe Ill try tomorrow on a branch

But I did get it to sign up and login with normal supabase way and in account I can allow you to create a payment account which is creating a payment wallet with only an email!

This adds a step to the process but it in trade doesnt give EVERY user a wallet, only the ones that are ready to invest. Its already a big hurdle to invest so Im just adding a step to it

However the thout process is this: You join platform to view artists on the platform, you see someone you like, you want to invest, you create payment wallet in account. You then buy juke tokens with fiat, and then you can use those juke tokens to either trade with artist tokens OR you stake them in the artist but its framed as investing in them. So the user has lost fiat, gottem tokens, and invested tokens in artist in exchange for shares.

You give up fiat in exchange for juke tokens
We own the mass supply of juke tokens, maybe a million total
We permiss one juke token for a dollar
You browse artists
artists have stock price
artist stock price is based on how many people have invested in them
by invested in them I mean staked?
you give up your juke tokens to this artists stake? The more people stake the more yours are worth?

Try to get wallets working tomorrow in as fristionless of a way as possible

- branch with only thirdweb sign in and second hand user creation in supabase
- branch with the account wallet creation with custom wallet connect modal

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

TODO: Build own version of https://www.npmjs.com/package/use-sound

Investing platform
