class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :file
      t.string :email

      t.timestamps null: false
    end
  end
end
