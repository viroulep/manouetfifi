class AddInvitedByToGuest < ActiveRecord::Migration[5.2]
  def change
    add_column :guests, :invited_by, :string
    add_index :guests, :invited_by
  end
end
