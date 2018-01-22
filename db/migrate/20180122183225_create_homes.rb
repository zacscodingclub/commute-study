class CreateHomes < ActiveRecord::Migration[5.1]
  def change
    create_table :homes do |t|
      t.references :commuter, foreign_key: true
      t.string :text
      t.float :lat
      t.float :lng

      t.timestamps
    end
  end
end
