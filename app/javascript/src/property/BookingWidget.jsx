import React, { useEffect, useState } from "react";
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const BookingWidget = ({property_id, price_per_night}) => {

  // states
  const [bookingData, setBookingData] = useState({
    authenticated: false,
    focusedInput: null,
    loading: false,
    error: false,
  });

  const [dates, setDates] = useState({
    startDate: null,
    endDate: null
  })
  
  // handlers
  const handleDatesChange = ({startDate, endDate}) => setDates({startDate, endDate})
  const handleFocusChange = (focusedInput) => setBookingData({...bookingData, focusedInput})

  const submitBooking = (e) => {
    if (e) {e.preventDefault()}
    const { startDate, endDate } = dates
    console.log(startDate.format('MMM DD YYYY'), endDate.format('MMM DD YYYY'));
    console.log('property', property_id)

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
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  };

  // check user logged in
  useEffect(() => {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        setBookingData({...bookingData,
          authenticated: data.authenticated,
        })
      })
  }, []);

  // variables
  const { authenticated, focusedInput } = bookingData
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

  return(
    <div className="border p-4 mb-4">
    <form onSubmit={submitBooking}>
      <h5>${price_per_night} <small>per night</small></h5>
      <hr/>
      <div className="mb-5">
      <DateRangePicker
        startDate={startDate}
        startDateId="start_date"
        endDate={endDate}
        endDateId="end_date"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={handleFocusChange}
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