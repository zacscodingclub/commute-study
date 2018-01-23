class ChangeTypeColumn < ActiveRecord::Migration[5.1]
  def change
    rename_column :destinations, :type, :place_type
  end
end
