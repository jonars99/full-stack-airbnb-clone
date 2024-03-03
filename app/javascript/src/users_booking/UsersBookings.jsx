import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import { handleErrors, safeCredentials } from '@utils/fetchHelper';
import { authenticateUser } from '@utils/requests';
import '@src/stylesheets/bookings.scss';
import moment from 'moment';

const UsersBookings = () => {

  const [authenticated, setAuthenticated] = useState(false);
  const [myBookings, setMyBookings] = useState({
    bookings: [],
  });

  // get bookings made by user
  const getUsersBookings = (user) => {
    fetch(`api/${user}/bookings`)
      .then(handleErrors)
      .then(data => {
        setMyBookings({
          ...myBookings,
          bookings: data.bookings,
        })
      })
  };

  const initiateStripeCheckout = (booking_id) => {
    return fetch(`/api/charges?booking_id=${booking_id}&cancel_url=${window.location.pathname}`, safeCredentials({
      method: 'POST',
    }))
    .then(handleErrors)
    .then(response => {
      const stripe = Stripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);

      stripe.redirectToCheckout({
        sessionId: response.charge.checkout_session_id,
      }).then((result) => {
        console.log('result error', result.error.message);
      });
    })
    .catch(error => {
      console.log(error);
    })
  }

  const completeBooking = (e) => {
    e.preventDefault();
    initiateStripeCheckout(e.target.value);
  }

  // fetch current user and their bookings
  useEffect(() => {
    authenticateUser(function (data) {
      setAuthenticated(data.authenticated);
      getUsersBookings(data.username);
    })
  }, []);

  if (authenticated) {
    // filter bookings depending on date
    const futureBookings = myBookings.bookings.filter(booking => new Date(booking.start_date) - new Date() > 0);
    const pastBookings = myBookings.bookings.filter(booking => new Date(booking.start_date) - new Date() <= 0);

    return (
      <Layout>

        <div className="container py-4">

          <h5>Your Bookings</h5>

          {futureBookings.length == 0 ? 
            // suggest booking a property when user has no bookings
            <div className="row">
              <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
                <div className="border rounded p-4 text-center">
                  <p>You have no upcoming reservations 🙁</p>
                  <a className="btn btn-danger" href="/" role="button">Book a place to stay!</a>
                </div>
              </div>
            </div>
            :
            // show users future bookings
            futureBookings.map(booking => {
              return (
                <div key={booking.id} className="row my-4 justify-content-center">
                  <div className="col-9 gx-0 property-booking my-1">

                    <div className="d-flex justify-content-between">
                      
                      <div className="p-4 ps-5">
                        <a href={`/property/${booking.property_id}`} className="text-body text-decoration-none">
                          <h6 className="m-0">{booking.property.title} <span className="fw-normal">in</span> {booking.property.city}</h6>
                          <small>{booking.property.property_type} hosted by {booking.property.host}</small>
                        </a>

                        <hr className="my-2"></hr>

                        <small className="mb-3 text-secondary">{moment(booking.start_date).format('MMM Do')} - {moment(booking.end_date).format('MMM Do YYYY')}</small>
                        {booking.paid ? 
                        <button className="btn btn-success btn-sm ms-5 px-5">paid</button> 
                         : 
                        <button className="btn btn-danger btn-sm ms-4" value={booking.id} onClick={completeBooking}>complete checkout</button>}
                      </div>
                      
                      <div>
                        <a href={`/property/${booking.property_id}`} className="text-body text-decoration-none">
                          <img className="property-img" src={`${booking.property.image_url}`} alt="property image and link"/>
                        </a>
                      </div>

                    </div>
                  </div>
                </div>
              )
            })
          }

          <h5>Past Bookings</h5>

            <div className="row ps-5">

              {pastBookings.length == 0 ? 
                // no past bookings
                <p className="text-secondary ms-4">You have no past bookings</p> 
                :
                // show users past bookings if any
                pastBookings.map(booking => {
                  return (
                    <div key={booking.id} className="col-4 g-4 past-property-booking p-0">

                      <a href={`/property/${booking.property_id}`} className="text-body text-decoration-none d-flex">
                        <img className="past-property-img rounded" src={`${booking.property.image_url}`} alt="property image and link"/>
                        
                        <span className="d-flex flex-column justify-content-center ps-2">
                          <h6 className="mb-1">{booking.property.city}</h6>
                          <small className="text-secondary">Hosted by {booking.property.host}</small>
                          <small className="text-secondary">{moment(booking.start_date).format('MMM Do')} - {moment(booking.end_date).format('MMM Do YYYY')}</small>
                        </span>
                      </a>

                    </div>
                  )
                })
              }
        
            </div>

        </div>
      </Layout>
    )
  }

  else {
    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
              <div className="border rounded p-4 text-center">
                <p>Please log in to view your reservations 🙂</p>
                <a className="btn btn-danger w-50" href="/login" role="button">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default UsersBookings;