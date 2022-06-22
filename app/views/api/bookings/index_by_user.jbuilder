json.bookings do 

  json.array! @bookings do |booking|
    json.id          booking.id
    json.user_id     booking.user_id
    json.property_id booking.property_id
    json.start_date  booking.start_date
    json.end_date    booking.end_date

    json.property do 
      json.id         booking.property.id
      json.title      booking.property.title
      json.image_url      url_for(booking.property.image_url)
      json.city           booking.property.city
      json.property_type  booking.property.property_type
      json.host           booking.property.user.username
    end
  end

end