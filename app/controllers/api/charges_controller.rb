module Api
  class ChargesController < ApplicationController

    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user is not logged in' }, status: :unauthorized if !session

      booking = Booking.find_by(id: params[:booking_id])
      return render json: { error: 'cannot find booking' }, status: :not_found if !booking

      property = booking.property
      nights_booked = (booking.end_date - booking.start_date).to_i
      amount = nights_booked * property.price_per_night

      session = Stripe::Checkout::Session.create(
        payment_method_types: ['card'],
        line_items: [{
          name: "Trip for #{property.title}",
          description: "Your booking is for #{booking.start_date} to #{booking.end_date}.",
          amount: (amount * 100.0).to_i, # amount in cents
          currency: "usd",
          quantity: 1,
        }],
        mode: "payment",
        success_url: "#{ENV['URL']}/booking/#{booking.id}/success",
        cancel_url: "#{ENV['URL']}#{params[:cancel_url]}",
      )

      @charge = booking.charges.new({
        checkout_session_id: session.id,
        currency: 'usd',
        amount: amount
      })

      if @charge.save
        render 'api/charges/create', status: :created
      else
        render json: { error: 'charge could not be created' }, status: :bad_request
      end
    end

  end
end