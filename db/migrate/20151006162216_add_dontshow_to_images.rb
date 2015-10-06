class AddDontshowToImages < ActiveRecord::Migration
  def change
    add_column :images, :dontshow, :boolean, default: false
  end
end
