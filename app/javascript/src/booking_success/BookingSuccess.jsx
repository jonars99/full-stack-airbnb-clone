import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import { handleErrors } from '@utils/fetchHelper';
import '@src/stylesheets/bookings.scss';

const BookingSuccess = (props) => {

  const [ bookedProperty, setBookedProperty ] = useState({
    booking: {},
    property: {},
  })

  const getBookedProperty = () => {
    fetch(`/api/booked/${props.booking_id}`)
    .then(handleErrors)
    .then(data => {
      setBookedProperty({
        booking: data.booking,
        property: data.booking.property,
      });
    })
  }

  useEffect(() => {
    getBookedProperty();
  }, []);

  const { booking_id, user_id, start_date, end_date, paid } = bookedProperty.booking
  const { property_id, title, image_url, city, host, property_type } = bookedProperty.property

  return (
    <Layout>
      <div className="container py-4">
      <h5>You have successfully booked your trip!</h5>
      <div className="row my-4 justify-content-center">
        <div className="col-9 gx-0 property-booking my-1">
          <div className="d-flex justify-content-between">
            <div className="p-4 ps-5">
              <a href={`/property/${property_id}`} className="text-body text-decoration-none">
                <h6 className="m-0">{title} <span className="fw-normal">in</span> {city}</h6>
                <small>{property_type} hosted by {host}</small>
              </a>

              <hr className="my-2"></hr>

              <small className="mb-3">from {start_date} to {end_date}</small>
            </div>
            
            <div>
              <a href={`/property/${property_id}`} className="text-body text-decoration-none">
                <img className="property-img" src={`${image_url}`} alt="property image and link"/>
              </a>
            </div>

          </div>
        </div>

      </div>
      <div className="text-center">
        <a className="btn btn-success" href="/mybookings" role="button">All Bookings</a>
      </div>

      </div>
    </Layout>
  )
}

export default BookingSuccess;