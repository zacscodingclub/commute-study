class CreateDestinations < ActiveRecord::Migration[5.1]
  def change
    create_table :destinations do |t|
      t.references :commuter, foreign_key: true
      t.string :text
      t.float :lat
      t.float :lng
      t.string :type
      t.string :mode

      t.timestamps
    end
  end
end
