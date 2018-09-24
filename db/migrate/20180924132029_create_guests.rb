class CreateGuests < ActiveRecord::Migration[5.2]
  def change
    create_table :guests do |t|
      t.string :name
      t.string :avatar
      t.text :description
      t.string :country_iso2
      t.boolean :confirmed

      t.timestamps
    end
  end
end
