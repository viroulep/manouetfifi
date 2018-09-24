json.extract! guest, :id, :name, :avatar, :description, :country_iso2, :created_at, :updated_at
json.url guest_url(guest, format: :json)
