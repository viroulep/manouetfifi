class Guest < ApplicationRecord
  belongs_to :table, optional: true
  mount_uploader :avatar, AvatarUploader
  validates_inclusion_of :country_iso2, in: Country.real.map(&:iso2).freeze
  INVITERS = %w(fifi manou).freeze
  validates_inclusion_of :invited_by, in: INVITERS
  validates_presence_of :name
end
