import React, { useEffect, useState } from "react";
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const BookingWidget = ({property_id, price_per_night}) => {

  // states
  const [userStatus, setUserStatus] = useState({
    authenticated: false,
  })

  const [bookingData, setBookingData] = useState({
    existingBookings: [],
    focusedInput: null,
    loading: false,
    error: false,
  });

  const [dates, setDates] = useState({
    startDate: null,
    endDate: null
  });

  // authenticate user
  const isUserLoggedIn = () => {
    fetch('/api/authenticated')
    .then(handleErrors)
    .then(data => {
      setUserStatus({
        authenticated: data.authenticated,
      });
    });
  };

  // get existing bookings
  const getBookings = () => {
    fetch(`/api/properties/${property_id}/bookings`)
    .then(handleErrors)
    .then(data => {
      setBookingData({...bookingData,
        existingBookings: data.bookings,
      })
    });
  };
  
  // handlers
  const handleDatesChange = ({startDate, endDate}) => setDates({startDate, endDate})
  const handleFocusChange = (focusedInput) => setBookingData({...bookingData, focusedInput})

  // initiate stripe checkout after booking
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

  // submit a booking
  const submitBooking = (e) => {
    if (e) {e.preventDefault()}
    const { startDate, endDate } = dates
    fetch('/api/bookings', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        booking: {
          property_id: property_id,
          start_date: startDate.format('MMM DD YYYY'),
          end_date: endDate.format('MMM DD YYYY'),
        }
      })
    }))
      .then(handleErrors)
      .then(response => {
        return initiateStripeCheckout(response.booking.id)
      })
      .catch(error => {
        console.log(error)
      })
  };

  const isDayBlocked = day => bookingData.existingBookings.filter(booking => day.isBetween(booking.start_date, booking.end_date, null, '[)')).length > 0

  // check user logged in and get existing bookings
  useEffect(() => {
    isUserLoggedIn()
    getBookings();
  }, []);

  // variables
  const { authenticated } = userStatus
  const { focusedInput } = bookingData
  const { startDate, endDate } = dates
  let nights;
  if (startDate && endDate) {
    nights = endDate.diff(startDate, 'days');
  }

 // prompt to log in if authentication fails
  if (!authenticated) {
    return(
      <div className="border p-4 mb-4">
        Please
        <a href={`/login?redirect_url=${window.location.pathname}`}>log in</a>
        to make a booking.
      </div>
    );
  };

  // else they can make a booking
  return(
    <div className="border p-4 mb-4">
    <form onSubmit={submitBooking}>
      <h5>${price_per_night} <small>per night</small></h5>
      <hr/>
      <div style={{ marginBottom: focusedInput ? '400px': '2rem' }}>
      <DateRangePicker
        startDate={startDate}
        startDateId="start_date"
        endDate={endDate}
        endDateId="end_date"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={handleFocusChange}
        isDayBlocked={isDayBlocked}
        numberOfMonths={1}
      />
      </div>

      {nights && (
        <div className="d-flex justify-content-between">
          <p>Total</p>
          {nights == 1 ? <p>{nights} night</p> : <p>{nights} nights</p>}
          <p>${(price_per_night * nights).toLocaleString()}</p>
        </div>
      )}

      <button type="submit" className="btn btn-large btn-danger w-100">Book</button>
    </form>
  </div>
  )
};

export default BookingWidget;