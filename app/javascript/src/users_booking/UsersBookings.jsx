import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import { handleErrors } from '@utils/fetchHelper';
import { authenticateUser } from '@utils/requests';

const UsersBookings = () => {

  const [authenticated, setAuthenticated] = useState(false);
  const [myBookings, setMyBookings] = useState({
    bookings: [],
    properties: [],
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

  // property data for bookings
  const getPropertyInfo = (property_id) => {
    fetch(`/api/properties/${property_id}`)
      .then(handleErrors)
      .then(data => {
        console.log(data);
      })
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
    const futureBookings = myBookings.bookings.filter(booking => new Date(booking.start_date) - new Date() > 0)
    const pastBookings = myBookings.bookings.filter(booking => new Date(booking.start_date) - new Date() <= 0)

    return (
      <Layout>

        <div className="container pt-4">
          {/*         {myBookings.bookings.forEach(booking => {
            getPropertyInfo(booking.property_id);
          })} */}
          <h5>Upcoming Trips</h5>
          {futureBookings.length == 0 ? 
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
                  <div className="border rounded p-4 text-center">
                    <p>You have no upcoming reservations 🙁</p>
                    <a className="btn btn-danger" href="/" role="button">Book a place to stay!</a>
                  </div>
                </div>
              </div>
            </div>
            :
            futureBookings.map(booking => {
              return (
                <div key={booking.id} className="col-6 ms-4 mb-4 property">
                  <a href={`http://localhost:3000/property/${booking.property_id}`} className="text-body text-decoration-none">
                    <h6 className="mb-0">{booking.property_id}</h6>
                    <p className="mb-0">from {booking.start_date} to {booking.end_date}</p>
                  </a>
                </div>
              )
            })
          }

          <h5>Past Trips</h5>
{/*           {pastBookings.map(booking => {
              return (
                <div key={booking.id} className="col-6 ms-4 mb-4 property">
                  <a href={`http://localhost:3000/property/${booking.property_id}`} className="text-body text-decoration-none">
                    <h6 className="mb-0">{booking.property_id}</h6>
                    <p className="mb-0">from {booking.start_date} to {booking.end_date}</p>
                  </a>
                </div>
              )
            })
          } */}
          {pastBookings.length == 0 ? <p className="text-secondary ms-4">You have no past reservations</p> : 
            pastBookings.map(booking => {
              return (
                <div key={booking.id} className="col-6 ms-4 mb-4 property">
                  <a href={`http://localhost:3000/property/${booking.property_id}`} className="text-body text-decoration-none">
                    <h6 className="mb-0">{booking.property_id}</h6>
                    <p className="mb-0">from {booking.start_date} to {booking.end_date}</p>
                  </a>
                </div>
              )
            })
          }
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