# FreshCart

FreshCart is the first e-commerce app I built, back in 2024 while I was studying the Front-End Development diploma at **Route Academy**. I've kept improving it since.

**Live demo:** https://mr-farhat.github.io/fresh-cart-app/

## Try it without signing up

The login page shows a demo account you can copy into the form:

| Email | Password |
| --- | --- |
| `demo@freshcart.app` | `Demo@2026` |

Demo mode lets you browse everything: products, categories, brands and product details. The cart, wish list, checkout and orders are stored on the server, so those need a real account (registration takes a few seconds).

## Features

- Sign up, log in, and a full forgot / verify code / reset password flow
- Product listing, categories, brands and product details with image sliders
- Cart with quantity updates, remove and clear, and a live item count in the navbar
- Wish list
- Online checkout (Stripe session from the API) and order history
- Protected routes that send you back to the page you wanted after login
- Form validation with Formik and Yup

## Tech stack

React 18, React Router 6, Redux Toolkit, React Query, Context API, Axios, Formik, Yup, Bootstrap 5, React Slick, React Toastify and SweetAlert2.

Data comes from the Route e-commerce API (`ecommerce.routemisr.com`).

## Run it locally

```bash
npm install
npm start
```

Build and deploy to GitHub Pages:

```bash
npm run deploy
```
