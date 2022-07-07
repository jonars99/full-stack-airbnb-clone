class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

  def login
    render 'login'
  end

  def users_bookings
    render 'users_booking'
  end

  def booking_success
    @data = { booking_id: params[:id] }.to_json
    render 'booking_success'
  end

end
