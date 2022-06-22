import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../Layout';
import { handleErrors } from '@utils/fetchHelper';
import { authenticateUser } from '@utils/requests';
import '@src/stylesheets/bookings.scss';

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

                <div key={booking.id} className="row my-4 ps-5">
                  <div className="col-8 gx-0 property-booking">
                    <a href={`/property/${booking.property_id}`} className="text-body text-decoration-none d-flex justify-content-between">

                      <span className="p-3 d-flex flex-column justify-content-center">
                        <h6>{booking.property.title} <span className="fw-normal">in</span> {booking.property.city}</h6>
                        <small>{booking.property.property_type} hosted by {booking.property.host}</small>
                        <hr className="m-1"></hr>
                        <small>from {booking.start_date} to {booking.end_date}</small>
                      </span>

                      <img className="property-img" src={`${booking.property.image_url}`} alt="property image and link"/>
                    </a>

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
                          <small className="text-secondary">{booking.start_date} — {booking.end_date}</small>
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