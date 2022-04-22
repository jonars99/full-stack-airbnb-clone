class CreateBookings < ActiveRecord::Migration[6.1]
  def change
    create_table :bookings do |t|
      t.date :start_date
      t.date :end_date
      t.belongs_to :user, index: true, foreign_key: true
      t.belongs_to :property, index: true, foreign_key: true
      t.timestamps
    end
  end
end
