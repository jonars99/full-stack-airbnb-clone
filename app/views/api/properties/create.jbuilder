json.property do
  json.id              @property.id
  json.title           @property.title
  json.description     @property.description
  json.city            @property.city
  json.country         @property.country
  json.property_type   @property.property_type
  json.price_per_night @property.price_per_night
  json.max_guests      @property.max_guests
  json.bedrooms        @property.bedrooms
  json.beds            @property.beds
  json.baths           @property.baths
  json.image           url_for(@property.image) if @property.image.attached?

  json.user do 
    json.id       @property.user.id
    json.username @property.user.username
  end
end