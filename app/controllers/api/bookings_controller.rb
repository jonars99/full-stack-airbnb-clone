module Api 
  class BookingsController < ApplicationController

    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in'}, status: :unauthorized if !session

      property = Property.find_by(id: params[:booking][:property_id])
      return render json: { error: 'cannot find property' }, status: :not_found if !property

      begin
        @booking = Booking.create({ 
          user_id: session.user.id, 
          property_id: params[:booking][:property_id], 
          start_date: params[:booking][:start_date], 
          end_date: params[:booking][:end_date]
        })
        render 'api/bookings/create', status: :created
      rescue ArgumentError => exception
        render json: { error: exception.message }, status: :bad_request
      end
    end

    def get_property_bookings
      property = Property.find_by(id: params[:id])
      return render json: { error: 'cannot find property' }, status: :not_found if !property

      @bookings = property.bookings.where("end_date > ? ", Date.today)
      render 'api/bookings/index'
    end

    def get_user_bookings
      user = User.find_by(username: params[:username])
      
      if user
        @bookings = user.bookings.all.order(start_date: :asc)
        render 'api/bookings/index_by_user'
      else 
        render json: { error: 'cannot find user' }
      end
    end

    def get_booked_property
      @booking = Booking.find_by(id: params[:id])
      property = @booking.property
      return render json: { error: 'cannot find property' }, status: :not_found if !property
      render 'api/bookings/booked_property'
    end

    private

    def booking_params
      params.require(:booking).permit(:property_id, :start_date, :end_date)
    end
    
  end
end