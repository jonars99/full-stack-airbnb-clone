class Charge < ApplicationRecord
  belongs_to :booking
  
  validates :checkout_session_id, presence: true
  validates :currency, presence: true
  validates :amount, presence: true
end

