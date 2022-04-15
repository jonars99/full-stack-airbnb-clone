class CreateProperties < ActiveRecord::Migration[6.1]
  def change
    create_table :properties do |t|
      t.string :title
      t.string :description
      t.string :city
      t.string :country
      t.string :property_type
      t.integer :price_per_night
      t.integer :max_guests
      t.integer :bedrooms
      t.integer :beds
      t.integer :baths
      t.string :image_url
      t.belongs_to :user, index: true, foreign_key: true

      t.timestamps
    end
  end
end
