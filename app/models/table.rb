class Table < ApplicationRecord
  has_many :guests, dependent: :nullify, inverse_of: :table
  accepts_nested_attributes_for :guests
end
