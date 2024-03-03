# Full Stack Airbnb Clone

Built with **React**, **Ruby on Rails** and **Sass**, using **Stripe** for payment. A full stack project for altcademy's web development course.

## Features

![screenshot of homepage](app/assets/images/homepage-start.png "screenshot of homepage")

* User authentication
* The user can **book properties**
* **[Stripe](https://docs.stripe.com/)** integration for payments

### Make a booking
![screenshot of booking page](app/assets/images/booking-create.png "screenshot of booking page")

### Payment with Stripe
![screenshot of payment with stripe](app/assets/images/stripe-payment-test.png "screenshot of payment with stripe")

### Complete a booking
![screenshot of booking completion](app/assets/images/booking-success.png "screenshot of booking completion")

## Versions

* Ruby 3.0.3
* Rails 6.1.5
* Node 17.0.23
* Webpacker 5.4.3
* Bootstrap 5

## Local development

1. Install GEMS

```
bundle
```

2. Install NPM packages

```
yarn
```

3. Start rails server

```
rails s
```

Or use foreman if you have it installed, it will run rails server and webpack dev server

```
foreman start -f Procfile.dev
```

4. Go to "localhost:3000" on browser.
