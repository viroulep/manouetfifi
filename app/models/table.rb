class Table < ApplicationRecord
  has_many :guests, dependent: :nullify

  validates_presence_of :name
  attr_writer :guests_ids
  before_save :assign_guests

  def guests_ids
    @guests_ids ||= guests.pluck(:id).join(",")
  end

  def guests_ids_array
    guests_ids.split(",")
  end

  def assign_guests
    # model is valid, let's try to update the guests
    begin
      objs = guests_ids_array.map { |id| Guest.find(id) }
      self.guests = objs
    rescue ActiveRecord::RecordNotFound => e
      @errors.add(:guests_ids, e.message)
      throw :abort
    end
  end
end
