class ModifyColumns < ActiveRecord::Migration[5.1]
  def change
    rename_column :homes, :text, :address
    rename_column :destinations, :text, :address
  end
end
