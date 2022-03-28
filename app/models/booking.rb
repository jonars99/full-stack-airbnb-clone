class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :property
  has_many :charges

  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :user, presence: true
  validates :property, presence: true

  before_validation :check_start_date_smaller_than_end_date
  before_validation :check_availability

  private

  def check_start_date_smaller_than_end_date
    if self.start_date > self.end_date
      raise ArgumentError.new("start date cannot be larger than end date")
    end
  end

  def check_availability
    overlapped_bookings = self.property.bookings.where("start_date < ? AND end_date > ? ", self.end_date, self.start_date)
    exact_booking = self.property.bookings.where("start_date = ? AND end_date = ? ", self.start_date, self.end_date)

    if overlapped_bookings.count > 0 || exact_booking.count > 0
      raise ArgumentError.new("date range overlaps with other bookings")
    end
  end
end
